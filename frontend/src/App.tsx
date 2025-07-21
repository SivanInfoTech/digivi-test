import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, XCircle, Download, FileText, Building, Users, ArrowRight, Sparkles } from 'lucide-react';

interface UploadedFile {
  name: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
}

interface VerificationResult {
  candidate: string;
  overallScore: number;
  status: {
    employerMatch: 'pass' | 'warning' | 'fail';
    dojMatch: 'pass' | 'warning' | 'fail';
    doeAmbiguity: 'pass' | 'warning' | 'fail';
    salaryMismatch: 'pass' | 'warning' | 'fail';
  };
}

function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'upload' | 'verifying' | 'results'>('landing');
  const [uploadedFiles, setUploadedFiles] = useState<{
    resume: UploadedFile | null;
    itr: UploadedFile | null;
    reference: UploadedFile | null;
  }>({
    resume: null,
    itr: null,
    reference: null
  });
  const [verificationResult] = useState<VerificationResult>({
    candidate: 'Mohan Raj',
    overallScore: 85,
    status: {
      employerMatch: 'pass',
      dojMatch: 'pass',
      doeAmbiguity: 'warning',
      salaryMismatch: 'fail'
    }
  });

  const handleFileUpload = (fileType: 'resume' | 'itr' | 'reference', file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: { name: file.name, type: file.type, status: 'uploading' }
    }));

    // Simulate upload process
    setTimeout(() => {
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: { name: file.name, type: file.type, status: 'success' }
      }));
    }, 1000);
  };

  const allFilesUploaded = uploadedFiles.resume?.status === 'success' && 
                          uploadedFiles.itr?.status === 'success' && 
                          uploadedFiles.reference?.status === 'success';

  const handleStartVerification = () => {
    setCurrentStep('verifying');
    setTimeout(() => {
      setCurrentStep('results');
    }, 3000);
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return 'text-green-700';
      case 'warning':
        return 'text-amber-700';
      case 'fail':
        return 'text-red-700';
    }
  };

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">DigVi</h1>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              ⚡ Fast. 🧠 Smart. ✅ Verified
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Background Checks Powered by AI
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Transform your hiring process with intelligent document verification. 
              Get instant, AI-powered background checks that save time and build confidence.
            </p>
          </div>

          {/* 3-Step Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Upload Docs</h4>
                  <p className="text-gray-600">
                    Drop your resume, ITR/EPFO data, and client references
                  </p>
                </div>
              </div>
              
              <div className="text-center group relative">
                <div className="hidden md:block absolute top-12 -left-4 w-8 h-8 text-gray-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">AI Validates</h4>
                  <p className="text-gray-600">
                    Our AI engine cross-references and validates all information
                  </p>
                </div>
              </div>
              
              <div className="text-center group relative">
                <div className="hidden md:block absolute top-12 -left-4 w-8 h-8 text-gray-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Download Report</h4>
                  <p className="text-gray-600">
                    Get your comprehensive verification report instantly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentStep('upload')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Verification ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">DigVi</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Candidate Files</h2>
            <p className="text-gray-600">Upload the required documents to start the AI verification process</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Resume Upload */}
              <UploadBox
                title="Resume"
                subtitle="PDF/DOC"
                icon={<FileText className="w-8 h-8" />}
                acceptedFormats="PDF, DOCX"
                file={uploadedFiles.resume}
                onFileUpload={(file) => handleFileUpload('resume', file)}
              />

              {/* ITR/EPFO Upload */}
              <UploadBox
                title="ITR/EPFO Data"
                subtitle="PDF"
                icon={<Building className="w-8 h-8" />}
                acceptedFormats="PDF"
                file={uploadedFiles.itr}
                onFileUpload={(file) => handleFileUpload('itr', file)}
              />

              {/* Reference Upload */}
              <UploadBox
                title="Client Reference"
                subtitle="Excel"
                icon={<Users className="w-8 h-8" />}
                acceptedFormats="XLSX"
                file={uploadedFiles.reference}
                onFileUpload={(file) => handleFileUpload('reference', file)}
              />
            </div>

            {/* Start Verification Button */}
            {allFilesUploaded && (
              <div className="text-center">
                <button
                  onClick={handleStartVerification}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Start AI Verification 🤖
                </button>
              </div>
            )}

            {/* Back Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentStep('landing')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Running AI-based validation...
          </h2>
          <p className="text-lg text-gray-600 mb-8">Hang tight! 🤖</p>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Processing documents...</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">DigVi</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Verification Complete! ✅</h2>
            <p className="text-gray-600">Here's your comprehensive AI-powered verification report</p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Result Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Candidate: {verificationResult.candidate}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mr-2">
                    ✅ {verificationResult.overallScore}%
                  </div>
                  <span className="text-lg text-gray-600">Overall Match</span>
                </div>
              </div>

              {/* Status Items */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    {getStatusIcon(verificationResult.status.employerMatch)}
                    <span className={`ml-3 font-medium ${getStatusText(verificationResult.status.employerMatch)}`}>
                      Employer Match
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full">
                    🟢 Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    {getStatusIcon(verificationResult.status.dojMatch)}
                    <span className={`ml-3 font-medium ${getStatusText(verificationResult.status.dojMatch)}`}>
                      DOJ Match
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full">
                    🟢 Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    {getStatusIcon(verificationResult.status.doeAmbiguity)}
                    <span className={`ml-3 font-medium ${getStatusText(verificationResult.status.doeAmbiguity)}`}>
                      DOE Ambiguity
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 bg-amber-100 px-3 py-1 rounded-full">
                    🟡 Review Needed
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    {getStatusIcon(verificationResult.status.salaryMismatch)}
                    <span className={`ml-3 font-medium ${getStatusText(verificationResult.status.salaryMismatch)}`}>
                      Salary Mismatch
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 bg-red-100 px-3 py-1 rounded-full">
                    🔴 Mismatch Found
                  </span>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center mx-auto">
                  <Download className="w-5 h-5 mr-2" />
                  📄 Download AI Verification Report (PDF)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setCurrentStep('upload');
                  setUploadedFiles({ resume: null, itr: null, reference: null });
                }}
                className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Verify Another Candidate
              </button>
              <button
                onClick={() => setCurrentStep('landing')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

interface UploadBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  acceptedFormats: string;
  file: UploadedFile | null;
  onFileUpload: (file: File) => void;
}

function UploadBox({ title, subtitle, icon, acceptedFormats, file, onFileUpload }: UploadBoxProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileUpload(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="relative group">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
          ${file?.status === 'success' 
            ? 'border-green-300 bg-green-50' 
            : file?.status === 'uploading' 
            ? 'border-blue-300 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
          }
          group-hover:shadow-lg`}
      >
        <input
          type="file"
          className="hidden"
          id={`file-${title}`}
          onChange={handleFileSelect}
          accept={acceptedFormats.includes('PDF') ? '.pdf' : acceptedFormats.includes('DOCX') ? '.docx,.doc' : '.xlsx'}
        />
        <label htmlFor={`file-${title}`} className="cursor-pointer">
          <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center
            ${file?.status === 'success' ? 'bg-green-100 text-green-600' : 
              file?.status === 'uploading' ? 'bg-blue-100 text-blue-600' : 
              'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
            {file?.status === 'success' ? <CheckCircle className="w-8 h-8" /> : 
             file?.status === 'uploading' ? <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : 
             icon}
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
          {file?.status === 'success' ? (
            <p className="text-sm text-green-600 font-medium">✅ {file.name}</p>
          ) : file?.status === 'uploading' ? (
            <p className="text-sm text-blue-600 font-medium">Uploading...</p>
          ) : (
            <p className="text-sm text-gray-400">Drag & drop or click to upload</p>
          )}
        </label>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        Accepted formats: {acceptedFormats}. Max size: 5MB.
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
}

export default App;