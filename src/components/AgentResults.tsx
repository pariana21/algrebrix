import { Download, ExternalLink } from 'lucide-react';

interface AgentResultsProps {
  results: Array<{
    url: string;
    title: string;
    excerpt: string;
  }>;
  csvUrl: string;
}

function AgentResults({ results, csvUrl }: AgentResultsProps) {
  return (
    <div className="mt-4 space-y-4">
      <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">URL</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Excerpt</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate max-w-xs">{result.url}</span>
                    </a>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{result.title}</td>
                  <td className="px-4 py-3 text-slate-600">{result.excerpt.substring(0, 150)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <a
        href={csvUrl}
        download
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Download className="w-4 h-4" />
        Download CSV
      </a>
    </div>
  );
}

export default AgentResults;
