import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import axios from 'axios';

export default class JiraReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed' && process.env.JIRA_URL) {
      try {
        await axios.post(
          `${process.env.JIRA_URL}/issue`,
          {
            fields: {
              project: { key: process.env.JIRA_PROJECT_KEY },
              summary: `[Automation Failure] ${test.title}`,
              description: `Test failed at: ${new Date().toISOString()}\nError: ${result.error?.message}`,
              issuetype: { name: 'Bug' },
            },
          },
          {
            auth: {
              username: process.env.JIRA_USERNAME!,
              password: process.env.JIRA_TOKEN!,
            },
          }
        );
      } catch (error: any) {
        console.error('Jira API Error:', error.response?.data?.errors || error.message);
      }
    }
  }
}

