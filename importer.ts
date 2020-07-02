import { writeJson } from "https://deno.land/std/fs/write_json.ts"
import { writeFileStr } from  "https://deno.land/std/fs/write_file_str.ts"
import { moment } from "https://deno.land/x/moment/moment.ts"

let db_url = "https://raw.githubusercontent.com/denoland/deno_website2/master/database.json"

let req = await fetch(db_url)
let res = await req.json()

let repos: any[] = [];

let counter: number = 0;
for (const repo in res) {
    console.log(`Fetching ${repo} - ${++counter}`)
    //@ts-ignore
    let github = await fetchRepo(res[repo])
    if (github.owner !== undefined) {

        if (github.archived) {
            console.log(`-------------- Repository ${repo} is archived.`)
        }

        if (github.disabled) {
            console.log(`-------------- Repository ${repo} is disabled.`)
        }

        if (!github.archived) {
            let db = githubToDb(github)
            let old = repos.find((item) => item.name === github.name && item.owner === github.owner.login)
            if (old === undefined) {
                repos.push(db)
            }
            else {
                console.log(`Repository ${repo} is duplicated`)
            }
            
        }
    }
}

//@ts-ignore
let sortedJson = repos.sort((n1, n2) => n2.stars - n1.stars)
await writeJson("./public/database.json", sortedJson, {spaces: 1})
let dt = moment().format()
await writeFileStr('./public/fetch.txt', dt)
console.log("Done")

function githubToDb(github: any): any {
    let res = {
        stars: github.stargazers_count,
        name: github.name,
        owner: github.owner.login,
        description: github.description,
        forks: github.forks_count,
        open_issues: github.open_issues_count,
        created: github.created_at,
        updated: github.updated_at,
        url: github.html_url,
        owner_url: github.owner.html_url
      };

      return res;
}

async function fetchRepo(repo: any): Promise<any> {
    let url = `https://api.github.com/repos/${repo.owner}/${repo.repo}`
    let username = "fakoua"
    let token = Deno.env.get("GITHUB_TOKEN")
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + token));

    let req = await fetch(url, {method:'GET', headers: headers})
    let res = await req.json()

    return res;
}