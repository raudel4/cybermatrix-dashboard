import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Activity, Shield, Cpu, Server, GitBranch, Terminal as TerminalIcon, Wifi } from 'lucide-react';

interface DashboardProps {
  className?: string;
}

interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

interface Project {
  name: string;
  status: string;
  progress: number;
  lastUpdate: Date;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkStatus, setNetworkStatus] = useState({ up: 0, down: 0 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [securityStatus, setSecurityStatus] = useState('Secure');
  const [hackerTraces, setHackerTraces] = useState(0);

  // Initialize with dummy data and simulate real-time updates
  useEffect(() => {
    // Initial projects
    setProjects([
      {
        name: 'Quantum Breach',
        status: 'Active',
        progress: 78,
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        name: 'Neural Network',
        status: 'Analyzing',
        progress: 45,
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        name: 'Blockchain Explorer',
        status: 'Standby',
        progress: 100,
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        name: 'Stealth Scanner',
        status: 'Scanning',
        progress: 67,
        lastUpdate: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        name: 'Encryption Engine',
        status: 'Compiling',
        progress: 92,
        lastUpdate: new Date(Date.now() - 45 * 60 * 1000)
      }
    ]);

    // Initial logs
    setLogs([
      {
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        message: 'System startup complete',
        type: 'success'
      },
      {
        timestamp: new Date(Date.now() - 1.5 * 60 * 1000),
        message: 'Initializing security protocols',
        type: 'info'
      },
      {
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        message: 'Detected unusual network activity',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 0.5 * 60 * 1000),
        message: 'Security countermeasures engaged',
        type: 'info'
      }
    ]);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate metrics updates
    const metricsInterval = setInterval(() => {
      setCpuUsage(Math.floor(20 + Math.random() * 50));
      setMemoryUsage(Math.floor(40 + Math.random() * 30));
      setNetworkStatus({
        up: Math.floor(Math.random() * 10),
        down: Math.floor(Math.random() * 15)
      });
    }, 3000);

    // Simulate log updates
    const logInterval = setInterval(() => {
      const newLog: LogEntry = {
        timestamp: new Date(),
        message: getRandomLogMessage(),
        type: getRandomLogType()
      };
      
      setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 20));
    }, 6000);

    // Simulate project updates
    const projectInterval = setInterval(() => {
      setProjects(prevProjects => 
        prevProjects.map(project => ({
          ...project,
          progress: updateProgress(project.progress),
          status: updateStatus(project.status, project.progress),
          lastUpdate: Math.random() > 0.7 ? new Date() : project.lastUpdate
        }))
      );
    }, 8000);

    // Simulate security updates
    const securityInterval = setInterval(() => {
      const rand = Math.random();
      
      if (rand > 0.9) {
        setSecurityStatus('⚠️ Alert');
        setHackerTraces(prev => prev + 1);
        
        // Add alert log
        const alertLog: LogEntry = {
          timestamp: new Date(),
          message: 'Potential intrusion attempt detected',
          type: 'error'
        };
        
        setLogs(prevLogs => [alertLog, ...prevLogs].slice(0, 20));
        
        // Reset after a delay
        setTimeout(() => {
          setSecurityStatus('Secure');
        }, 5000);
      }
    }, 15000);

    // Cleanup
    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
      clearInterval(logInterval);
      clearInterval(projectInterval);
      clearInterval(securityInterval);
    };
  }, []);

  // Helper functions for simulation
  const getRandomLogMessage = () => {
    const messages = [
      'System check complete',
      'Scanning for vulnerabilities',
      'Updated security protocols',
      'Connection established',
      'New encryption key generated',
      'Analyzing network traffic',
      'Firewall rules updated',
      'Background task completed',
      'Memory optimization performed',
      'New node discovered',
      'Cache cleared successfully',
      'Proxy configuration updated',
      'VPN tunnel established',
      'File integrity verified',
      'Authentication request processed',
      'Database backup completed',
      'API rate limit adjusted',
      'User session validated',
      'Remote access granted',
      'Logs archived successfully'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomLogType = () => {
    const types: Array<'info' | 'warning' | 'error' | 'success'> = [
      'info', 'info', 'info', 'info', 'info',
      'warning', 'warning',
      'error',
      'success', 'success', 'success'
    ];
    
    return types[Math.floor(Math.random() * types.length)];
  };

  const updateProgress = (current: number) => {
    if (current >= 100) return 100;
    
    const change = Math.floor(Math.random() * 10);
    const newProgress = current + change;
    
    return Math.min(newProgress, 100);
  };

  const updateStatus = (current: string, progress: number) => {
    if (progress >= 100) return 'Completed';
    
    const statuses = ['Active', 'Analyzing', 'Scanning', 'Compiling', 'Processing', 'Debugging'];
    
    // 80% chance to keep current status
    if (Math.random() > 0.2) return current;
    
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // Format relative time
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Get class for log type
  const getLogClass = (type: string) => {
    switch (type) {
      case 'info': return 'text-cyber-blue';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-cyber-red';
      case 'success': return 'text-cyber-primary';
      default: return 'text-cyber-primary';
    }
  };

  return (
    <div className={cn("p-4 grid grid-cols-1 md:grid-cols-12 gap-4", className)}>
      {/* Header / Stats */}
      <Card className="col-span-1 md:col-span-12 cyber-panel p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-cyber-primary" />
          <div>
            <h3 className="text-sm font-cyber">SECURITY STATUS</h3>
            <p className={`text-xl ${securityStatus !== 'Secure' ? 'text-cyber-red animate-pulse' : 'text-cyber-primary'}`}>
              {securityStatus}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-6 w-6 text-cyber-primary" />
          <div>
            <h3 className="text-sm font-cyber">SYSTEM</h3>
            <p className="text-xl text-cyber-primary">CypherTrax OS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-cyber-primary" />
          <div>
            <h3 className="text-sm font-cyber">CPU / MEMORY</h3>
            <p className="text-xl text-cyber-primary">{cpuUsage}% / {memoryUsage}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-cyber-primary" />
          <div>
            <h3 className="text-sm font-cyber">TIME</h3>
            <p className="text-xl text-cyber-primary">{formatTime(currentTime)}</p>
          </div>
        </div>
      </Card>
      
      {/* Project Status */}
      <Card className="col-span-1 md:col-span-8 cyber-panel p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-cyber text-cyber-primary">Project Status</h2>
          <div className="text-xs text-cyber-primary/60">Last updated: {formatTime(currentTime)}</div>
        </div>
        
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="cyber-border p-3 rounded">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-cyber">{project.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  project.status === 'Completed' ? 'bg-cyber-primary/20 text-cyber-primary' :
                  project.status === 'Active' ? 'bg-cyber-blue/20 text-cyber-blue' :
                  'bg-cyber-muted/20 text-cyber-muted'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="w-full h-2 bg-cyber-darker rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyber-primary transition-all duration-500 ease-out"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-cyber-primary/70">{project.progress}% complete</span>
                <span className="text-xs text-cyber-primary/70">
                  {timeAgo(project.lastUpdate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* System Logs */}
      <Card className="col-span-1 md:col-span-4 cyber-panel p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-cyber text-cyber-primary">System Logs</h2>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-cyber-primary animate-pulse"></div>
            <span className="text-xs text-cyber-primary/60">Live</span>
          </div>
        </div>
        
        <div className="space-y-2 h-[500px] overflow-y-auto pr-2">
          {logs.map((log, index) => (
            <div key={index} className={`text-xs border-l-2 pl-2 ${
              log.type === 'error' ? 'border-cyber-red' :
              log.type === 'warning' ? 'border-yellow-400' :
              log.type === 'success' ? 'border-cyber-primary' :
              'border-cyber-blue'
            }`}>
              <div className="flex justify-between items-center">
                <span className={getLogClass(log.type)}>
                  {log.message}
                </span>
                <span className="text-cyber-primary/50 ml-2 whitespace-nowrap">
                  {formatTime(log.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Network Activity */}
      <Card className="col-span-1 md:col-span-6 cyber-panel p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-cyber text-cyber-primary">Network Activity</h2>
          <div className="flex items-center space-x-1">
            <Wifi className="h-4 w-4 text-cyber-primary animate-pulse" />
            <span className="text-xs text-cyber-primary/60">
              {networkStatus.up} Mb/s ↑ | {networkStatus.down} Mb/s ↓
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-cyber">Active Connections</h3>
              <span className="text-cyber-blue">{12 + Math.floor(Math.random() * 8)}</span>
            </div>
          </div>
          
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-cyber">Blocked Attempts</h3>
              <span className="text-cyber-red">{150 + Math.floor(Math.random() * 50)}</span>
            </div>
          </div>
          
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-cyber">Gateway Status</h3>
              <span className="text-cyber-primary">Protected</span>
            </div>
          </div>
          
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-cyber">Protocol</h3>
              <span className="text-cyber-primary">TOR+VPN</span>
            </div>
          </div>
          
          <div className="cyber-border p-3 rounded col-span-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-cyber">Last Scan</h3>
              <span className="text-cyber-primary">{timeAgo(new Date(Date.now() - 5 * 60 * 1000))}</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* GitHub Activity */}
      <Card className="col-span-1 md:col-span-6 cyber-panel p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-cyber text-cyber-primary flex items-center">
            <GitBranch className="h-5 w-5 mr-2" /> GitHub Activity
          </h2>
          <div className="text-xs text-cyber-primary/60">Last updated: {timeAgo(new Date(Date.now() - 30 * 60 * 1000))}</div>
        </div>
        
        <div className="space-y-3">
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-cyber">quantum-breach</h3>
                <p className="text-xs text-cyber-primary/70">Optimization commit: "Improved decryption algorithm"</p>
              </div>
              <span className="text-xs text-cyber-primary/60">2h ago</span>
            </div>
          </div>
          
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-cyber">neural-network</h3>
                <p className="text-xs text-cyber-primary/70">New feature: "Added pattern recognition module"</p>
              </div>
              <span className="text-xs text-cyber-primary/60">5h ago</span>
            </div>
          </div>
          
          <div className="cyber-border p-3 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-cyber">stealth-scanner</h3>
                <p className="text-xs text-cyber-primary/70">Bug fix: "Resolved false positive detection issue"</p>
              </div>
              <span className="text-xs text-cyber-primary/60">1d ago</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Security Metrics */}
      <Card className="col-span-1 md:col-span-12 cyber-panel p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-cyber text-cyber-primary">Security Metrics</h2>
          <div className="text-xs text-cyber-primary/60">
            <Server className="h-4 w-4 inline mr-1" /> System protected
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="cyber-border p-3 rounded flex justify-between items-center">
            <h3 className="text-sm font-cyber">Intrusion Attempts</h3>
            <span className="text-cyber-red">{1258 + Math.floor(Math.random() * 100)}</span>
          </div>
          
          <div className="cyber-border p-3 rounded flex justify-between items-center">
            <h3 className="text-sm font-cyber">Encryption Level</h3>
            <span className="text-cyber-blue">AES-256</span>
          </div>
          
          <div className="cyber-border p-3 rounded flex justify-between items-center">
            <h3 className="text-sm font-cyber">Hacker Traces</h3>
            <span className="text-cyber-purple">{hackerTraces}</span>
          </div>
          
          <div className="cyber-border p-3 rounded flex justify-between items-center">
            <h3 className="text-sm font-cyber">CTF Points</h3>
            <span className="text-cyber-neon">12,450</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
