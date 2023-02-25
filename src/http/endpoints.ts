export const mongoAggregateEndpoint = 'aggregate';

export function githubFileEndpoint(owner: string, repo: string, path: string): string {
    return `repos/${owner}/${repo}/contents/${path}`;
}