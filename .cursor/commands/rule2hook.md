# Task: Convert Project Rules to Cursor Code Hooks

You are an expert at converting natural language project rules into Cursor Code hook configurations. Your task is to analyze the given rules and generate appropriate hook configurations following the official Cursor Code hooks specification.

## Instructions

1. If rules are provided as arguments, analyze those rules
2. If no arguments are provided, read and analyze project documentation files:
   - `./README.md` (project documentation)
   - `.cursor/commands/start-working-on-jira-issue.md` (project methodology)
   - Any other relevant documentation files

3. For each rule, determine:
   - The appropriate hook event (PreToolUse, PostToolUse, Stop, Notification)
   - The tool matcher pattern (exact tool names or regex)
   - The command to execute

4. Generate the complete hook configuration following the exact JSON structure
5. Save it to the appropriate settings file (merge with existing hooks if present)
  - `.cursor/settings.json` (Project settings)
6. Provide a summary of what was configured

## Hook Events

### PreToolUse
- **When**: Runs BEFORE a tool is executed
- **Common Keywords**: "before", "check", "validate", "prevent", "scan", "verify"
- **Available Tool Matchers**: 
  - `Task` - Before launching agent tasks
  - `Bash` - Before running shell commands
  - `Glob` - Before file pattern matching
  - `Grep` - Before content searching
  - `Read` - Before reading files
  - `Edit` - Before editing single files
  - `MultiEdit` - Before batch editing files
  - `Write` - Before writing/creating files
  - `WebFetch` - Before fetching web content
  - `WebSearch` - Before web searching
  - `TodoRead` - Before reading todo list
  - `TodoWrite` - Before updating todo list
- **Special Feature**: Can block tool execution if command returns non-zero exit code

### PostToolUse
- **When**: Runs AFTER a tool completes successfully
- **Common Keywords**: "after", "following", "once done", "when finished"
- **Available Tool Matchers**: Same as PreToolUse
- **Common Uses**: Formatting, linting, building, testing after file changes

### Stop
- **When**: Runs when Cursor Code finishes responding
- **Common Keywords**: "finish", "complete", "end task", "done", "wrap up"
- **No matcher needed**: Applies to all completions
- **Common Uses**: Final status checks, summaries, cleanup

### Notification
- **When**: Runs when Cursor Code sends notifications
- **Common Keywords**: "notify", "alert", "inform", "message"
- **Special**: Rarely used for rule conversion

## Hook Configuration Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName|AnotherTool|Pattern.*",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

## Matcher Patterns

- **Exact match**: `"Edit"` - matches only Edit tool
- **Multiple tools**: `"Edit|MultiEdit|Write"` - matches any of these
- **Regex patterns**: `".*Edit"` - matches Edit and MultiEdit
- **All tools**: Omit matcher field entirely

## Examples with Analysis

### Example 1: Python Formatting
**Rule**: "Format Python files with black after editing"
**Analysis**: 
- Keyword "after" → PostToolUse
- "editing" → Edit|MultiEdit|Write tools
- "Python files" → command should target .py files

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{
        "type": "command",
        "command": "black . --quiet 2>/dev/null || true"
      }]
    }]
  }
}
```

### Example 2: Test Runner
**Rule**: "Run pytest after modifying backend files"
**Analysis**:
- "after modifying" → PostToolUse
- "files" → Edit|MultiEdit|Write
- "backend" → command should target backend directory

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{
        "type": "command",
        "command": "cd backend && pytest 2>/dev/null || echo 'Backend tests need attention'"
      }]
    }]
  }
}
```

### Example 3: Frontend Test Runner
**Rule**: "Run npm test after modifying frontend files"
**Analysis**:
- "after modifying" → PostToolUse
- "files" → Edit|MultiEdit|Write
- "frontend" → command should target frontend directory

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{
        "type": "command",
        "command": "cd frontend && npm test 2>/dev/null || echo 'Frontend tests need attention'"
      }]
    }]
  }
}
```

## Best Practices for Command Generation

1. **Error Handling**: Add `|| true` or `2>/dev/null` to prevent hook failures from blocking Cursor
2. **Quiet Mode**: Use quiet flags (--quiet, -q) when available
3. **Path Safety**: Use relative paths or check existence
4. **Performance**: Keep commands fast to avoid slowing down Cursor
5. **Logging**: Redirect verbose output to avoid cluttering Cursor's interface

## Common Rule Patterns

- "Format [language] files after editing" → PostToolUse + Edit|MultiEdit|Write
- "Run [command] before committing" → PreToolUse + Bash (when git commit detected)
- "Check for [pattern] before saving" → PreToolUse + Write|Edit|MultiEdit
- "Execute [command] when done" → Stop event
- "Validate [something] before running commands" → PreToolUse + Bash
- "Clear cache after modifying config" → PostToolUse + Edit|MultiEdit|Write

## Important Notes

1. Always merge with existing hooks - don't overwrite
2. Test commands work before adding to hooks
3. Consider performance impact of hooks
4. Use specific matchers when possible to avoid unnecessary executions
5. Commands run with full user permissions - be careful with destructive operations
6. Follow the methodology described in start-working-on-jira-issue.md command

## User Input
$ARGUMENTS

