import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PrismicRichText } from '@prismicio/react';
import { asImageSrc } from '@prismicio/helpers';
import { createPrismicClient } from '../../prismicClient';
import './WorkProjectPage.css';

type ProjectDoc = {
  id: string;
  uid: string | null;
  data: {
    title?: string;
    summary?: string;
    hero_image?: any;
    body?: any;
    gallery?: Array<{ image?: any; caption?: string }>;
    category?: { uid?: string; data?: { title?: string } } | null;
  };
};

export default function WorkProjectPage() {
  const navigate = useNavigate();
  const { categoryUid, projectUid } = useParams();

  const client = useMemo(() => createPrismicClient(), []);
  const [project, setProject] = useState<ProjectDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (!client) {
          throw new Error('Prismic is not configured. Set VITE_PRISMIC_REPO_NAME.');
        }
        if (!projectUid) {
          throw new Error('Missing project.');
        }

        const doc = (await client.getByUID('project', projectUid, {
          fetchLinks: ['work_category.title'],
        })) as unknown as ProjectDoc;

        if (cancelled) return;
        setProject(doc);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [client, projectUid]);

  if (loading) {
    return (
      <div className="work-project" style={{ padding: '2rem' }}>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="work-project" style={{ padding: '2rem' }}>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <p style={{ color: '#b00020' }}>{error || 'Not found'}</p>
      </div>
    );
  }

  const title = project.data.title || project.uid || 'Project';
  const heroUrl = asImageSrc(project.data.hero_image as any);
  const categoryTitle = (project.data.category as any)?.data?.title || categoryUid;

  const galleryItems = (project.data.gallery || [])
    .map((g) => ({
      url: asImageSrc((g as any).image),
      caption: (g as any).caption as string | undefined,
    }))
    .filter((g) => Boolean(g.url));

  const rightClass = galleryItems.length <= 1 ? 'work-right single' : 'work-right';

  return (
    <div className="work-project">
      <div className="work-hero">
        {heroUrl ? <div className="work-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} /> : null}
        <div className="work-hero-overlay" />
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          style={{ position: 'absolute', top: 24, left: 24, zIndex: 2 }}
        >
          ← Back
        </button>
        <div className="work-hero-title">
          {categoryTitle ? <p>{String(categoryTitle)}</p> : null}
          <h1>{title}</h1>
        </div>
      </div>

      <div className="work-body">
        <div className="work-body-grid">
          <div className="work-left">
            {project.data.summary ? <p className="work-summary">{project.data.summary}</p> : null}
            {project.data.body ? <PrismicRichText field={project.data.body} /> : null}
          </div>

          <div className={rightClass}>
            {galleryItems.map((g) => (
              <img key={g.url} src={g.url!} alt={g.caption || title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
