import React, {useState, useRef, useEffect} from "react";
import { Upload, X, Check, AlertCircle, Loader2} from "lucide-react";
import { FileUploadProps } from "@/types";



export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  maxSizeMB = 2, 
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  initialPreviewUrl = '',
  className = '',
}) => {

  // --- STATE ---
  const [previewUrl, setPreviewUrl] = useState<string>(initialPreviewUrl);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- REFS ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<any>(null);

  // Sync with initial preview if it changes
  useEffect(() => {
    if (initialPreviewUrl) {
      setPreviewUrl(initialPreviewUrl);
    }
  }, [initialPreviewUrl]);


  
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

 
  const processFile = (file: File) => {
   
    setErrorMessage(null);
    setIsLoading(false);
    setUploadProgress(0);

    // ------Validation: Check File Type----
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      const allowedExtensions = allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ');
      setErrorMessage(`Unsupported format. Please upload: ${allowedExtensions}`);
      return;
    }

    //------ Validation: Check File Size------
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrorMessage(`File too large. Max allowed size is ${maxSizeMB}MB.`);
      return;
    }

    //------Convert file to Base64 using FileReader-----

    const reader = new FileReader();

    // ------Run when file reading starts----
    reader.onloadstart = () => {
      setIsLoading(true);
      setUploadProgress(0);

      // ------- progress bar loader--------

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      let currentProgress = 0;
      progressIntervalRef.current = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 10; 

        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressIntervalRef.current);
        }
        setUploadProgress(currentProgress);
      }, 80);
    };

    // ----Run when file reading completes successfully----

    reader.onload = () => {
      const base64Url = reader.result as string;

   
      setTimeout(() => {
        setPreviewUrl(base64Url);
        setIsLoading(false);
        onFileSelect(base64Url); 
      }, 400);
    };

    // -----Run if file reading fails-----

    reader.onerror = () => {
      setErrorMessage('Failed to read file. Please try again.');
      setIsLoading(false);
    };

    
    reader.readAsDataURL(file);
  };

  // --- DRAG AND DROP  ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Clear file and reset component state

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setPreviewUrl('');
    setUploadProgress(0);
    setErrorMessage(null);
    setIsLoading(false);
    onFileSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={allowedTypes.join(',')}
        className="hidden"
      />

     
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isLoading ? triggerFileInput : undefined}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 min-h-[170px] ${
          isDragActive
            ? 'border-indigo-600 bg-indigo-50/40 shadow-inner' 
            : 'border-gray-300 hover:border-black bg-gray-50/50 hover:bg-gray-100/30'
        } ${isLoading ? 'pointer-events-none border-indigo-400 bg-indigo-50/10' : ''} ${
          errorMessage ? 'border-red-400 bg-red-50/10' : ''
        }`}
      >
        
        {!previewUrl && !isLoading && !errorMessage && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm mb-3 text-gray-500 group-hover:text-black transition-colors">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-gray-800">
              Drag & drop image here, or <span className="text-indigo-600 underline underline-offset-2">browse</span>
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Supports JPEG, PNG, WEBP, GIF (Max: {maxSizeMB}MB)
            </p>
          </div>
        )}

       
        {isLoading && (
          <div className="w-full max-w-xs flex flex-col items-center py-2">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mb-2" />
            <p className="text-xs font-bold text-gray-800 mb-2">Processing image...</p>
            
            //-----progress bar ------

            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-indigo-600 mt-1.5">{uploadProgress}%</span>
          </div>
        )}

        
        {previewUrl && !isLoading && (
          <div className="relative flex flex-col items-center py-1">
            <button
              onClick={removeFile}
              className="absolute -top-3 -right-3 p-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors border border-red-200 shadow-sm"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 shadow-md mb-2 bg-white">
              <img src={previewUrl} alt="Uploaded profile" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-green-100">
              <Check className="w-3 h-3" />
              Upload Complete
            </div>
          </div>
        )}

       
        {errorMessage && !isLoading && (
          <div className="flex flex-col items-center py-1">
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100 text-red-600 mb-2">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-red-600">Validation Error</p>
            <p className="text-[10px] text-gray-500 mt-1 max-w-[200px] leading-relaxed">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={removeFile}
              className="mt-3 text-[10px] font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors"
            >
              Try Another File
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
