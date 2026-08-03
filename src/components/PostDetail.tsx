import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Seo } from './Seo';
import libraryData from '../data/naviter-library.json';

interface LibraryPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string[];
  tags: string[];
  excerpt: string;
  featuredImage: string | null;
  contentHtml: string;
  seoTitle: string;
  seoDescription: string;
}

const posts = libraryData as unknown as LibraryPost[];

function formatDate(d: string) {
  const dt = new Date((d || '').replace(' ', 'T'));
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const PostDetail = ({ onNavigateToLibrary }: { onNavigateToLibrary?: () => void }) => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  // Embedded advisorlibrary iframes post their height via postMessage.
  // The inline <script> in the imported HTML does NOT run (React strips it),
  // so we re-implement the auto-resize listener here.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data: any = e.data;
      if (data && data.id && data.height) {
        const f = document.getElementById(data.id) as HTMLIFrameElement | null;
        if (f) f.height = data.height + 'px';
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const contentStyles = `
    .library-post-content { color: #1e293b; font-size: 1rem; line-height: 1.75; }
    .library-post-content p { margin-bottom: 1.25rem; }
    .library-post-content h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 1.6rem; color: #0b2545; margin: 2rem 0 1rem; }
    .library-post-content h3 { font-family: Georgia, 'Times New Roman', serif; font-size: 1.25rem; color: #0b2545; margin: 1.5rem 0 0.75rem; }
    .library-post-content a { color: #154372; text-decoration: underline; }
    .library-post-content strong { font-weight: 600; }
    .library-post-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
    .library-post-content ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
    .library-post-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5rem 0; }
    .library-post-content iframe { width: 100%; min-height: 800px; border: 0; }
    .library-post-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
    .library-post-content td, .library-post-content th { border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left; }
    .library-post-content th { background: #f8fafc; }
    .library-post-content .bordered-blue-button,
    .library-post-content a.bordered-blue-button { display: inline-block; background: #154372; color: #fff !important; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 600; margin: 0.5rem 0; }
  `;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f4f4f8] flex flex-col items-center justify-center px-6 text-center py-32">
        <Seo title="Publication Not Found - Naviter Wealth" description="The requested publication could not be found." />
        <h1 className="text-3xl font-serif text-naviter-navy mb-4">Publication not found</h1>
        <Link to="/our-library" className="text-naviter-blue underline">← Back to Our Library</Link>
      </div>
    );
  }

  const primaryCategory = post.category && post.category.length ? post.category[0] : 'Insights';

  return (
    <div className="flex flex-col w-full bg-[#f4f4f8] min-h-screen">
      <Seo
        title={post.seoTitle || `${post.title} - Naviter Wealth`}
        description={post.seoDescription || post.excerpt || 'A publication from Naviter Wealth.'}
      />
      <style>{contentStyles}</style>

      {/* Hero */}
      <section className="relative w-full bg-naviter-navy">
        {post.featuredImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-30"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-naviter-navy/70" />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <Link
            to="/our-library"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Our Library
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase text-naviter-gold">
              {primaryCategory}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Calendar size={12} /> {formatDate(post.date)}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="w-full py-12 md:py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-12">
          {post.contentHtml ? (
            <div
              className="library-post-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <div className="text-center py-8 space-y-4">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full max-h-96 object-cover rounded-lg mb-6"
                  referrerPolicy="no-referrer"
                />
              )}
              <p className="text-naviter-navy/80 leading-relaxed">{post.excerpt}</p>
              <p className="text-sm text-gray-400 italic">Full publication content is being prepared.</p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <Link
            to="/our-library"
            onClick={onNavigateToLibrary}
            className="inline-flex items-center gap-2 text-naviter-navy hover:text-naviter-blue text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={14} /> Back to Our Library
          </Link>
        </div>
      </section>
    </div>
  );
};
