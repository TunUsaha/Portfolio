import { useEffect, useState } from 'preact/hooks';

// กำหนด interface สำหรับ GitHub repository
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGitHubRepos(): Promise<void> {
      const username = 'TunUsaha';
      const url = `https://api.github.com/users/${username}/repos`;

      try {
        const response = await fetch(url);
        const data: GitHubRepo[] = await response.json();

        if (data && data.length > 0) {
          const filteredRepos = data.filter(
            (repo: GitHubRepo) =>
              repo.name !== 'Portfolio' && repo.name !== 'TunUsaha',
          );
          setRepos(filteredRepos);
        }
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubRepos();
  }, []);

  if (loading) {
    return <div className='project-cards'>Loading...</div>;
  }

  return (
    <div className='project-cards' id='project-cards'>
      {repos.map((repo: GitHubRepo) => (
        <div key={repo.id} className='card'>
          <img
            className='corner-image top-right'
            src='/images/image10.png'
            alt=''
          />
          <img
            className='corner-image bottom-left'
            src='/images/image10.png'
            alt=''
          />
          <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
            <h3>{repo.name}</h3>
            <p>{repo.description || 'No description available'}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
