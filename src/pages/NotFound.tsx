
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatrixRain from "@/components/MatrixRain";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black p-6 relative">
      <div className="cyber-panel max-w-md w-full p-8 text-center relative overflow-hidden">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-cyber-red mx-auto mb-4" />
          <h1 className="text-6xl font-cyber text-cyber-red mb-4">404</h1>
          <div className="cyber-border w-1/2 mx-auto mb-4 border-cyber-red/50"></div>
          <p className="text-xl text-cyber-primary mb-2 font-cyber">ACCESS DENIED</p>
          <p className="text-sm text-cyber-primary/70 mb-6">
            The requested data file could not be located on this server.
            <br />
            Error code: CX-404-FILE-NOT-FOUND
          </p>
        </div>
        
        <div className="relative z-10">
          <Button 
            onClick={() => navigate('/')} 
            className="cyber-button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Main Terminal
          </Button>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-cyber-red/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-12 bg-gradient-to-t from-cyber-red/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-cyber-red/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-cyber-red/20 to-transparent"></div>
      </div>
      
      <div className="cyber-panel mt-6 p-3 font-mono text-xs text-cyber-primary/60 max-w-md w-full">
        <div className="flex justify-between">
          <span>System Log</span>
          <span>{new Date().toISOString()}</span>
        </div>
        <div className="mt-1 text-left">
          Error: Attempted to access non-existent resource at {location.pathname}
        </div>
      </div>
      
      <MatrixRain className="opacity-30" />
      <div className="crt-overlay"></div>
    </div>
  );
};

export default NotFound;
