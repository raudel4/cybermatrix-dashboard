
import React, { useState, useEffect } from 'react';
import Terminal from '@/components/Terminal';
import Dashboard from '@/components/Dashboard';
import MatrixRain from '@/components/MatrixRain';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, TerminalSquare, LayoutDashboard, Shield, Eye } from 'lucide-react';

const Index = () => {
  const [view, setView] = useState<'terminal' | 'dashboard'>('dashboard');
  const [commandHistory, setCommandHistory] = useState<{ command: string; output: string }[]>([]);
  const [stealthMode, setStealthMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Create a smooth loading animation over 2 seconds
    const startTime = Date.now();
    const duration = 2000; // 2 seconds
    
    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setLoadingProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 100); // Small delay after reaching 100%
      }
    };
    
    requestAnimationFrame(updateProgress);
    
    return () => {
      // Cleanup if component unmounts
    };
  }, []);

  const handleCommandExecuted = (command: string, output: string) => {
    setCommandHistory(prev => [...prev, { command, output }]);
    
    if (command === 'exit') {
      toast({
        title: "Switching to dashboard",
        description: "Terminal minimized. Launching graphical interface.",
      });
      
      setTimeout(() => {
        setView('dashboard');
      }, 1000);
    }
  };

  const handleSecretCommand = () => {
    setStealthMode(true);
    
    toast({
      title: "STEALTH MODE ACTIVATED",
      description: "Welcome to the shadow network. Secure channel established.",
      variant: "destructive",
    });
  };

  const toggleView = () => {
    setView(prev => prev === 'terminal' ? 'dashboard' : 'terminal');
    
    toast({
      title: `Switching to ${view === 'terminal' ? 'dashboard' : 'terminal'}`,
      description: `Loading ${view === 'terminal' ? 'graphical' : 'command-line'} interface...`,
    });
  };

  const toggleStealthMode = () => {
    setStealthMode(prevMode => {
      const newMode = !prevMode;
      
      toast({
        title: newMode ? "STEALTH MODE ACTIVATED" : "STEALTH MODE DEACTIVATED",
        description: newMode 
          ? "Welcome to the shadow network. Secure channel established." 
          : "Returning to standard security protocols.",
        variant: newMode ? "destructive" : "default",
      });
      
      return newMode;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black p-4">
        <div className="text-center relative mb-6">
          <h1 
            className="text-4xl sm:text-6xl font-cyber text-cyber-primary neon-text"
            data-text="CypherTrax"
          >
            CypherTrax
          </h1>
          <p className="text-cyber-secondary mt-2 text-sm sm:text-base">
            Initializing secure connection...
          </p>
        </div>
        
        <div className="w-64 mb-2">
          <Progress value={loadingProgress} className="h-2 bg-cyber-darker" />
        </div>
        
        <div className="text-xs text-cyber-primary/60 font-cyber">
          {loadingProgress < 30 ? "Establishing secure connection..." : 
           loadingProgress < 60 ? "Decrypting access protocols..." : 
           loadingProgress < 90 ? "Authenticating credentials..." : 
           "Connection established."}
        </div>
        
        <div className="crt-overlay"></div>
        <MatrixRain />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${stealthMode ? 'bg-black' : 'bg-cyber-black'}`}>
      <header className={`p-4 flex justify-between items-center border-b ${stealthMode ? 'border-cyber-purple/30' : 'border-cyber-primary/30'} transition-colors duration-500`}>
        <div className="flex items-center">
          <h1 
            className={`text-2xl font-cyber ${stealthMode ? 'text-cyber-purple blue-neon-text' : 'text-cyber-primary neon-text'} transition-all duration-500`}
            data-text="CypherTrax"
          >
            CypherTrax
          </h1>
          <div className={`ml-2 px-2 py-0.5 text-xs rounded-full ${stealthMode ? 'bg-cyber-purple/20 text-cyber-purple' : 'bg-cyber-primary/20 text-cyber-primary'} transition-colors duration-500`}>
            v1.0.0
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`cyber-button text-xs ${stealthMode ? 'border-cyber-purple text-cyber-purple' : ''}`}
            onClick={toggleStealthMode}
          >
            {stealthMode ? (
              <>
                <Eye className="h-3 w-3 mr-1" /> Stealth Mode
              </>
            ) : (
              <>
                <Shield className="h-3 w-3 mr-1" /> Secure Mode
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`cyber-button text-xs ${stealthMode ? 'border-cyber-purple text-cyber-purple' : ''}`}
            onClick={toggleView}
          >
            {view === 'terminal' ? (
              <>
                <LayoutDashboard className="h-3 w-3 mr-1" /> Dashboard View
              </>
            ) : (
              <>
                <TerminalSquare className="h-3 w-3 mr-1" /> Terminal View
              </>
            )}
          </Button>
        </div>
      </header>
      
      <main className="flex-grow flex p-4">
        <div className={`w-full h-full transition-all duration-500 ease-in-out transform ${view === 'terminal' ? 'translate-x-0' : '-translate-x-full absolute opacity-0 pointer-events-none'}`}>
          <Terminal 
            className={`h-full transition-colors duration-500 ${stealthMode ? 'border-cyber-purple/50 shadow-[0_0_10px_rgba(138,87,255,0.3),inset_0_0_10px_rgba(138,87,255,0.2)]' : ''}`}
            onCommandExecuted={handleCommandExecuted}
            onSecretCommand={handleSecretCommand} 
          />
        </div>
        
        <div className={`w-full h-full transition-all duration-500 ease-in-out transform ${view === 'dashboard' ? 'translate-x-0' : 'translate-x-full absolute opacity-0 pointer-events-none'}`}>
          <Dashboard 
            className={`transition-colors duration-500 ${stealthMode ? 'border-cyber-purple/50' : ''}`}
          />
        </div>
      </main>
      
      <footer className={`p-3 border-t ${stealthMode ? 'border-cyber-purple/30' : 'border-cyber-primary/30'} transition-colors duration-500`}>
        <div className="flex justify-between items-center">
          <div className="text-xs font-cyber text-cyber-primary/60">
            Connection: {stealthMode ? 'Encrypted (TOR+VPN)' : 'Secure'} | 
            Status: {Math.random() > 0.5 ? 'Active' : 'Scanning'} | 
            IP: {stealthMode ? 'Masked' : '192.168.1.XXX'}
          </div>
          
          <div className="text-xs font-cyber text-cyber-primary/60">
            © 2023 CypherTrax | v1.0.0
          </div>
        </div>
      </footer>
      
      <div className="crt-overlay"></div>
      {stealthMode ? (
        <div className="fixed top-0 left-0 w-full h-full bg-cyber-purple/5 -z-5"></div>
      ) : null}
      <MatrixRain className={stealthMode ? 'opacity-20 text-cyber-purple' : ''} />
    </div>
  );
};

export default Index;
