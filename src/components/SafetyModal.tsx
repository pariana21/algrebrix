import { X, Shield, AlertTriangle } from 'lucide-react';

interface SafetyModalProps {
  onClose: () => void;
}

function SafetyModal({ onClose }: SafetyModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Safety & Privacy Notice</h2>
        </div>

        <div className="space-y-4 text-slate-700">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">What Algebrix Will NEVER Do:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Request or store your account credentials</li>
                <li>Perform login actions on any website</li>
                <li>Make purchases or financial transactions</li>
                <li>Access pages requiring authentication without warning you</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">What Algebrix Can Do:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Search and analyze publicly accessible web content</li>
                <li>Solve mathematical problems with step-by-step explanations</li>
                <li>Extract and summarize information from multiple sources</li>
                <li>Generate downloadable CSV reports</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900">
              <strong>Rate Limiting:</strong> To prevent abuse, we limit concurrent agent tasks to 2 per IP address.
              If you encounter rate limit errors, please wait for your current task to complete.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}

export default SafetyModal;
