import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { Buffer } from 'buffer';
import process from 'process';

export default class JiraReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed' && process.env.JIRA_URL) {
      const username = process.env.JIRA_USERNAME ?? '';
      const token = process.env.JIRA_TOKEN ?? '';
      const authorization = `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`;

      await fetch(`${process.env.JIRA_URL}/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
        body: JSON.stringify({
          fields: {
            summary: `Fail: ${test.title}`,
            description: result.error?.message,
          },
        }),
      });
    }
  }
}
