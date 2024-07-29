import json
from typing import Optional
from datetime import datetime

# title of project
# description
# create markdwo nfile for new project
# update list of projects in the landing page (how?) 

def init_boilerplate(
    title: str, 
    techStack: list[str], 
    repoUrl: Optional[str] = None, 
    pubDate: datetime = datetime.today(),
) -> str:
    output = "---\ntechStack:\n"

    output += "".join([f"- {t}\n" for t in techStack])
    output += f"pubDate: {pubDate.strftime('%Y-%m-%d')}\n"
    output += f"repoUrl: {False if repoUrl is None else repoUrl}\n"
    output += f"title: {title}\n"

    output += "layout: ../../layouts/ProjectLayout.astro\n---\n\nMarkdown starts here!"

    return output


def make_project():
    # title of proejct
    title: str = input("> Title of project? ")

    techStackCorrect = False

    repoUrl = input("> Source code URL? (<enter to skip>, else paste link + enter) ")
    url = repoUrl if repoUrl != "" else None

    pubDate = input("> Creation date? (<enter to skip>, YYYY-MM + enter) ")

    description = input("> Brief description of project (enter to submit): \n")

    while not techStackCorrect:
        techStack = input("> Tech stack? (separate with spaces): ")
        items = [f"- {t}\n" for t in techStack.strip().split(" ")]
        print(f"> Your stack is:\n  {'  '.join(items)}")
        techStackCorrect = input(f"> Is this correct? (y = yes, n = no/retype) ") == "y"
    
    techStack = techStack.split(" ")

    print("--- FINAL CONFIRMATION ---")
    print(f"title of project: {title}")
    print(f"tech stack:       {techStack}")
    print(f"repo URL:         {url}")

    confirmation = input("> Confirm? (y/n) ") == "y"

    args = [title, techStack, url]
    args.append(datetime.strptime(pubDate, "%Y-%m") if pubDate != "" else datetime.today())

    if confirmation:
        filename: str = title.strip().lower().replace(" ", "-")
        f = open(f"./src/pages/projects/{filename}.md", "a")
        f.write(init_boilerplate(*args))
        f.close()
        print(f"> File created at /src/pages/projects/{filename}")
        month, year = args[-1].month, args[-1].year
        update_json(title, description, f"/projects/{filename}", month, year)
    else:
        print("project creation cancelled.")

def update_json(title: str, desc: str, url: Optional[str], pubMonth: int, pubYear: int):
    f = open("test.json", "r+")
    data = json.load(f)
    data.append({
        "title": title,
        "url": url,
        "pubDate": { "month": pubMonth, "year": pubYear },
        "description": desc,
    })

    data.sort(reverse=True, key=lambda i: i["pubDate"]["year"] + i["pubDate"]["month"] / 100)
    f.seek(0)
    json.dump(data, f, indent=4)
    f.truncate()
    f.close()

if __name__ == "__main__":
    make_project()