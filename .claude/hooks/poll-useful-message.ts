import {processUsefulMessage} from "./utils/pubsub-client.ts";
import {readStdin} from "./utils/utils.ts";

async function main() {
    await readStdin();

    let additionalContext;
    let success = true;
    try {
        additionalContext = await processUsefulMessage();
    } catch (err) {
        additionalContext = `Failed to poll Pub/Sub: ${err}`;
        success = false;
    }

    process.stdout.write(JSON.stringify({
        systemMessage: `SessionStart hook ran successfully. Context: ${additionalContext}`,
        hookSpecificOutput: {
            hookEventName: "SessionStart",
            additionalContext,
            sessionTitle: additionalContext,
        },
    }));
    process.exit(success ? 0 : 1);
}

await main();

export {}
