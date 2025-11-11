import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md w-full text-center">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-700 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
