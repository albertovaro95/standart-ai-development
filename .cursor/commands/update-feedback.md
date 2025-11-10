# GitHub Issue Workflow for Issue #$ARGUMENT$

## Setup Phase
1. Fetch latest branches: `git fetch origin`
2. Get issue details using GitHub MCP
   - Fetch issue: `mcp_github_get_issue owner="albertovaro95" repo="standart-ai-development" issue_number=$ARGUMENT$`

## Analysis Phase
1. Read the full issue content and ALL comments using GitHub MCP
2. Read the full PR attached to the Issue and ALL comments using GitHub MCP
3. Analyze the Manual Testing Required

## Obtain feedback phase
1. Use @qa-criteria-validator agent to provide feedback over the manual test required and the use cases described in the issue over the deployment url
2. Add the feedback as a comment in the PR using GitHub MCP: `mcp_github_add_issue_comment`

## Decision over feedback
1. If the report from @qa-criteria-validator is all success update the issue with a message saying "ISSUE READY TO MERGE" using GitHub MCP
2. If the report from @qa-criteria-validator has missing fixes comment the PR with the feedback using GitHub MCP

## Important Notes
- Follow the methodology described in start-working-on-jira-issue.md command
- Use GitHub MCP tools for all GitHub operations
- Ensure all tests pass before marking as ready to merge

