import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Upload, File, CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const simulateUpload = async (file: File): Promise<void> => {
    const uploadFile: UploadFile = {
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    };

    setFiles(prev => [...prev, uploadFile]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id 
          ? { ...f, progress }
          : f
      ));
    }

    // Simulate random success/failure
    const success = Math.random() > 0.2; // 80% success rate
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFiles(prev => prev.map(f => 
      f.id === uploadFile.id 
        ? { ...f, status: success ? 'success' : 'error', progress: 100 }
        : f
    ));

    if (success) {
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`,
      });
    } else {
      toast({
        title: "Upload failed",
        description: `Failed to upload ${file.name}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleFiles = useCallback((fileList: FileList) => {
    Array.from(fileList).forEach(file => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        simulateUpload(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Only PDF files are supported.",
          variant: "destructive",
        });
      }
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'uploading':
        return <LoadingSpinner size="sm" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Contracts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Drop your PDF contracts here
            </h3>
            <p className="text-muted-foreground mb-6">
              or click to browse your files
            </p>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <EnhancedButton variant="outline" asChild>
                <span className="cursor-pointer">
                  Browse Files
                </span>
              </EnhancedButton>
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              PDF files only, up to 10MB each
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Upload Queue ({files.length})</h4>
                <EnhancedButton
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                >
                  Clear All
                </EnhancedButton>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                      
                      {file.status === 'uploading' && file.progress !== undefined && (
                        <div className="mt-1">
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusIcon(file.status)}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <EnhancedButton variant="outline" onClick={onClose}>
              Close
            </EnhancedButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};