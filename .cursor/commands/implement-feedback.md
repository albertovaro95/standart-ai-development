# GitHub Feedback Workflow for Issue #$ARGUMENT$

## Setup Phase
1. Fetch latest branches: `git fetch origin`
2. Get issue details using GitHub MCP
   - Fetch issue: `mcp_github_get_issue owner="albertovaro95" repo="standart-ai-development" issue_number=$ARGUMENT$`

## Analysis Phase
1. Read the full issue content and ALL comments using GitHub MCP
2. Analyze the requirements, context, and feedback thoroughly

## Implementation Phase
1. Implement a plan to apply the changes needed for the feedback in the PR
2. Execute the plan step by step, remember to build test before the implementation and run the test suite constantly to get quick feedback.
3. Create always unit tests
   - Backend: pytest tests
   - Frontend: Vitest/Jest tests
4. Ensure consistency with existing code in the branch
5. Run local builds and tests suite before git commit & push
   - Backend: `pytest` or `python -m pytest`
   - Frontend: `npm test` or `npm run test`
6. Never implement the manual tests
7. Update the PR with the new changes that covers the feedback using GitHub MCP
8. Report status of completeness:

<results>

  # Summary of the requirements implemented:
	- req 1
        - req 2
	- ...

  # Requirements pending
	- req 1
        - req 2
	- ...
  # Test implemented and their run status
     Backend tests: pytest results
     Frontend tests: npm test results

  # Proof that all build passes
     Backend: uvicorn server starts successfully
     Frontend: npm run build passes
  
  # Overall status: [Needs More Work/All Completed]
  # PR: github-pr-url
</result>

9. Stay tuned to the pr until the deploy is done successfully using GitHub MCP: `mcp_github_get_pull_request_status`
10. If some verification fails check the problems and implement the fixes updating the PR and try again in loop until have all verifications in success

## Important Notes
- The All completed is the desired status and we can only arrive if we have implemented all the requirements and all the test suite are implemented and green otherwise we need more work until that happens
- Always use GitHub MCP tools for GitHub operations
- Keep detailed records of all actions as PR/issue comments
- Wait for explicit confirmation before proceeding with major changes
- Follow the methodology described in start-working-on-jira-issue.md command

## Final checks
- After create the PR review that the validations in the pipeline are success, if they are pending wait until they are success checking using GitHub MCP
- If the validations are failed, review the issues or ask for them to me
- After have the issues, implement the fixes and push again to the PR until all the validations are success, continue in loop until have them all in green
- Once all is green, update the issue with a comment of what is implemented and your labour is finished

