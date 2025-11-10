<github_isssue>
#$ARGUMENTS
</github_isssue>
1- git worktree add ./.trees/feature-issue-$ARGUMENTS -b feature-issue-$ARGUMENTS
2- cd .trees/feature-issue-$ARGUMENTS
3- activate plan mode on
4- analyze the github issue #$ARGUMENTS and determine with the @project-coordinator subagent what subagents from the folder @.cursor/agents should be involved in implement this issue. @project-coordinator should determine if the agents can run in parallel if there is no overlaping on tasks, even run parallel instances of the same agent if is needed or possible, ALWAYS show the plan to the user to confirm
5- at the end after the confirmation of the user, commit the changes and push them to the branch

**Important Notes:**
- Follow the methodology described in start-working-on-jira-issue.md command
- Use appropriate agents from `.cursor/agents/` for Python/FastAPI backend and React/Vite frontend
- Ensure tests are written and passing before committing

