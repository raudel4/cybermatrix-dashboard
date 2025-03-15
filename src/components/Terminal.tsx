
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
  onCommandExecuted?: (command: string, output: string) => void;
  onSecretCommand?: () => void;
}

interface CommandHistory {
  command: string;
  output: string[];
}

const Terminal: React.FC<TerminalProps> = ({ 
  className, 
  onCommandExecuted,
  onSecretCommand
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [previousCommands, setPreviousCommands] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Command list
  const commands: { [key: string]: (args: string[]) => string[] } = {
    help: () => [
      'Available commands:',
      '  help - Show this help message',
      '  clear - Clear the terminal',
      '  whoami - Display user information',
      '  ls [dir] - List files in directory',
      '  cat <file> - Show file contents',
      '  projects - Show projects list',
      '  skills - Show skills list',
      '  contact - Show contact information',
      '  about - About this terminal',
      '  echo <message> - Print a message',
      '  date - Show current date and time',
      '  uname - Show system information',
      '  exit - Exit terminal (redirects to dashboard)'
    ],
    clear: () => {
      setCommandHistory([]);
      return [];
    },
    whoami: () => [
      '┌──────────────────────────────────────────────┐',
      '│ CyberSec Specialist & Full-Stack Developer   │',
      '│ ID: CYPH-3R-7R4X                             │',
      '│ Access Level: Administrator                  │',
      '│ Status: Online                               │',
      '└──────────────────────────────────────────────┘',
      '',
      'Type "skills" or "projects" to learn more.'
    ],
    ls: (args) => {
      const dir = args[0] || '';
      
      if (dir === 'projects') {
        return [
          'Directory: ./projects/',
          '  quantum_breach.exe',
          '  neural_network.py',
          '  blockchain_explorer.js',
          '  stealth_scanner.sh',
          '  encryption_engine.rs'
        ];
      } else if (dir === 'skills') {
        return [
          'Directory: ./skills/',
          '  web_exploitation.md',
          '  penetration_testing.md',
          '  cryptography.md',
          '  reverse_engineering.md',
          '  network_security.md'
        ];
      } else if (dir === 'secrets') {
        return [
          'Directory: ./secrets/',
          '  access_codes.txt [encrypted]',
          '  hidden_projects.json [encrypted]',
          '  .shadow_key [hidden]'
        ];
      } else {
        return [
          'Directory: ./',
          '  projects/',
          '  skills/',
          '  about.txt',
          '  contact.md',
          '  README.md',
          '  secrets/ [restricted]'
        ];
      }
    },
    cat: (args) => {
      const file = args[0] || '';
      
      if (file === 'about.txt') {
        return [
          '# CypherTrax Terminal v1.0.0',
          '',
          'A cyberpunk-themed interactive portfolio terminal.',
          'Navigate through different sections using commands.',
          '',
          'This terminal is part of a larger hacker-themed portfolio.',
          'Type "help" to see available commands.'
        ];
      } else if (file === 'contact.md') {
        return [
          '## Contact Information',
          '',
          '- Email: contact@cyphertrax.net',
          '- Matrix: @cypher:matrix.org',
          '- Signal: [Encrypted]',
          '- GitHub: github.com/cyphertrax',
          '',
          'For secure communication, use PGP key below:',
          '```',
          'BEGIN PGP PUBLIC KEY BLOCK',
          '[... Key data redacted for security ...]',
          'END PGP PUBLIC KEY BLOCK',
          '```'
        ];
      } else if (file === 'README.md') {
        return [
          '# CypherTrax Portfolio README',
          '',
          'Welcome to my digital playground. This terminal-based UI',
          'allows you to navigate through my portfolio and projects',
          'using familiar command-line interfaces.',
          '',
          '## Navigation',
          'Use "ls" to view directories and "cat" for viewing files.',
          '',
          '## Hidden Content',
          'Some content requires special access. Keep exploring.',
          '',
          '## Dashboard Access',
          'Type "exit" to switch to the graphical dashboard view.'
        ];
      } else if (file === 'secrets.txt') {
        return [
          'ACCESS DENIED: Insufficient privileges.',
          'Authentication required for access to encrypted content.',
          '',
          'Hint: Try entering the secret command "shadowrun".'
        ];
      } else if (args.length === 0) {
        return ['Error: No file specified. Usage: cat <filename>'];
      } else {
        return [`Error: File not found: ${file}`];
      }
    },
    projects: () => [
      '┌──────────────────────────────────────────────────────────────┐',
      '│ PROJECT LIST                                                 │',
      '├──────────────────────────────────────────────────────────────┤',
      '│ 1. Quantum Breach - Advanced penetration testing framework   │',
      '│ 2. Neural Network - AI-powered data analysis tool            │',
      '│ 3. Blockchain Explorer - Cryptocurrency analysis platform    │',
      '│ 4. Stealth Scanner - Network vulnerability detection system  │',
      '│ 5. Encryption Engine - Military-grade encryption tool        │',
      '└──────────────────────────────────────────────────────────────┘',
      '',
      'Use "ls projects" and "cat <project_name>" for more details.'
    ],
    skills: () => [
      '┌──────────────────────────────────────────────────────┐',
      '│ SKILL SET                                            │',
      '├──────────────────────────────────────────────────────┤',
      '│ » Web Exploitation         [██████████]     100%     │',
      '│ » Penetration Testing      [████████__]      80%     │',
      '│ » Cryptography             [███████___]      70%     │',
      '│ » Reverse Engineering      [██████____]      60%     │',
      '│ » Network Security         [█████████_]      90%     │',
      '│ » Full-Stack Development   [██████████]     100%     │',
      '│ » Cloud Architecture       [████████__]      80%     │',
      '└──────────────────────────────────────────────────────┘'
    ],
    contact: () => [
      '┌──────────────────────────────────────────────┐',
      '│ CONTACT INFORMATION                          │',
      '├──────────────────────────────────────────────┤',
      '│ Email: contact@cyphertrax.net               │',
      '│ Matrix: @cypher:matrix.org                   │',
      '│ Signal: [Encrypted]                          │',
      '│ GitHub: github.com/cyphertrax                │',
      '└──────────────────────────────────────────────┘',
      '',
      'For secure communication, encrypt messages using PGP.'
    ],
    about: () => [
      '┌──────────────────────────────────────────────────────────────┐',
      '│ CypherTrax Terminal Interface v1.0.0                         │',
      '├──────────────────────────────────────────────────────────────┤',
      '│ A cyberpunk-themed terminal-based portfolio interface.       │',
      '│ Developed using React, TypeScript, and custom CSS.           │',
      '│ Navigate through sections using familiar terminal commands.  │',
      '│                                                              │',
      '│ Features:                                                    │',
      '│ - Interactive command line                                   │',
      '│ - Project showcase                                           │',
      '│ - Skill demonstrations                                       │',
      '│ - Hidden content                                             │',
      '│ - Cyberpunk aesthetics                                       │',
      '└──────────────────────────────────────────────────────────────┘'
    ],
    echo: (args) => [args.join(' ')],
    date: () => [new Date().toString()],
    uname: () => ['CypherTrax-OS v1.0.0 (React/TypeScript) on Browser'],
    exit: () => {
      // Here you would handle the exit action, like redirecting to dashboard
      return ['Exiting terminal... Redirecting to dashboard...'];
    },
    shadowrun: () => {
      if (onSecretCommand) {
        setTimeout(() => {
          onSecretCommand();
        }, 1000);
      }
      return [
        '> INITIATING SECURE CONNECTION',
        '> BYPASSING SECURITY PROTOCOLS',
        '> ACCESSING SHADOW NETWORK',
        '...',
        '> ACCESS GRANTED',
        '',
        'Welcome to the shadows, runner. Stealth mode activated.',
        'Redirecting to secure channel...'
      ];
    }
  };

  // Initialize the terminal with a welcome message
  useEffect(() => {
    const initialOutput: CommandHistory = {
      command: '',
      output: [
        '┌────────────────────────────────────────────────────┐',
        '│ CypherTrax Terminal v1.0.0                         │',
        '│ Access: Unrestricted                               │',
        '│ Connection: Secure                                 │',
        '└────────────────────────────────────────────────────┘',
        '',
        'Welcome to CypherTrax Terminal Interface.',
        'Type "help" to see available commands.',
        ''
      ]
    };
    
    setCommandHistory([initialOutput]);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Focus the input when component mounts or when clicked anywhere in terminal
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClickAnywhere = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;
    
    const [command, ...args] = trimmedCmd.split(' ');
    
    // Save command to history
    setPreviousCommands([trimmedCmd, ...previousCommands]);
    setCommandIndex(-1);

    let output: string[];
    
    if (commands[command]) {
      output = commands[command](args);
      
      // If it's a clear command, just return
      if (command === 'clear') return;
      
      // Notify parent component about command execution (if callback provided)
      if (onCommandExecuted) {
        onCommandExecuted(trimmedCmd, output.join('\n'));
      }
      
    } else if (command === 'hack') {
      // Easter egg command
      output = ['Initiating hack sequence...'];
      
      // Show a toast notification
      toast({
        title: "Hack Initiated",
        description: "Just kidding. That's not a real command.",
        variant: "default",
      });
      
    } else {
      output = [`Command not found: ${command}. Type "help" for available commands.`];
    }
    
    setCommandHistory([...commandHistory, { command: trimmedCmd, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle up/down arrow keys for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(commandIndex + 1, previousCommands.length - 1);
      if (newIndex >= 0 && previousCommands.length > 0) {
        setCommandIndex(newIndex);
        setInput(previousCommands[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(commandIndex - 1, -1);
      setCommandIndex(newIndex);
      if (newIndex >= 0) {
        setInput(previousCommands[newIndex]);
      } else {
        setInput('');
      }
    }
  };

  return (
    <div 
      className={cn(
        "cyber-panel h-full overflow-hidden flex flex-col relative",
        className
      )}
      onClick={handleClickAnywhere}
    >
      <div className="flex items-center justify-between mb-2 border-b border-cyber-primary/30 pb-2">
        <div className="text-sm flex space-x-2 items-center">
          <div className="h-3 w-3 rounded-full bg-cyber-red animate-pulse"></div>
          <div className="h-3 w-3 rounded-full bg-cyber-neon"></div>
          <div className="h-3 w-3 rounded-full bg-cyber-blue"></div>
          <span className="ml-2 text-cyber-primary/80">cyphertrax@terminal:~</span>
        </div>
        <div className="text-xs text-cyber-primary/60">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-grow overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyber-primary/30 font-cyber text-sm"
      >
        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="flex items-start">
                <span className="text-cyber-secondary mr-2">$</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output.map((line, lineIdx) => (
              <div key={lineIdx} className="whitespace-pre-wrap ml-4">
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="mt-2 flex items-center border-t border-cyber-primary/30 pt-2">
        <span className="text-cyber-secondary mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none text-cyber-primary font-cyber"
          aria-label="Terminal input"
        />
      </form>
      
      <div className="scanline" style={{ top: '0px' }}></div>
    </div>
  );
};

export default Terminal;
