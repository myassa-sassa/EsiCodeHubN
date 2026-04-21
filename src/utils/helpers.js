export const simColor = p => p>70?'#EF4444':p>30?'#F59E0B':'#10B981';

export const statusStyle = s => s==='pending'?{bg:'#FFFAEB',color:'#FFC533',icon:'⏳'}:s==='flagged'?{bg:'#FEF3F2',color:'#EF4444',icon:'🚩'}:{bg:'#ECFDF5',color:'#10B981',icon:'✓'};

export const langStyle = l => l==='Python'?{background:'#FFFAEB',color:'#FFC533'}:{background:'#EEF3FD',color:'#3B5BDB'};

export const modColor = m => ({POO:{background:'#E8F0FE',color:'#3B5BDB'},SFSD:{background:'#E6F7E6',color:'#10B981'},ALSDD:{background:'#FFF4E6',color:'#FFC533'},ALSDS:{background:'#F3E8FF',color:'#9B59B6'}}[m]||{background:'#F8F9FA',color:'#333'});