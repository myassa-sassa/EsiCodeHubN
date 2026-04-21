export const SUBS = [
  { id:1, studentId:'24/0001', studentName:'neila houali', initials:'YB', title:'Binary Search Tree', language:'Python', module:'ALSDD', year:'1CP', status:'pending', similarity:18, date:'2024-03-27', code:`class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\ndef insert(root, val):\n    if root is None:\n        return Node(val)\n    if val < root.val:\n        root.left = insert(root.left, val)\n    else:\n        root.right = insert(root.right, val)\n    return root` },
  { id:2, studentId:'24/0002', studentName:'rania sifodil', initials:'SM', title:'File Management', language:'Java', module:'ALSDS', year:'1CP', status:'flagged', similarity:87, date:'2024-03-27', code:`import java.io.*;\nimport java.util.*;\n\npublic class FileManager {\n    public static void main(String[] args) {\n        try {\n            File file = new File("data.txt");\n            Scanner sc = new Scanner(file);\n            while(sc.hasNextLine()) System.out.println(sc.nextLine());\n            sc.close();\n        } catch(Exception e) { e.printStackTrace(); }\n    }\n}` },
  { id:3, studentId:'23/0015', studentName:'amel nouri', initials:'KA', title:'Library Management', language:'Java', module:'POO', year:'2CP', status:'reviewed', similarity:5, date:'2024-03-26', code:`public class Book {\n    private String title, author;\n    private int year;\n    public Book(String title, String author, int year) {\n        this.title=title; this.author=author; this.year=year;\n    }\n    public void display() { System.out.println(title+" by "+author); }\n}` },
  { id:4, studentId:'23/0023', studentName:'Lyna Haddad', initials:'LH', title:'CSV File Management', language:'Python', module:'SFSD', year:'2CP', status:'pending', similarity:42, date:'2024-03-26', code:`import csv\n\ndef read_csv(filename):\n    with open(filename,"r") as f:\n        for row in csv.reader(f): print(row)\n\ndef write_csv(filename, data):\n    with open(filename,"w") as f:\n        csv.writer(f).writerows(data)` },
];

export const STUDENTS = [
  { id:'24/0001', name:'meyassa taguemount', initials:'YB', year:'1CP', module:'ALSDD', email:'yacine@esi.dz', submissions:8, progress:75 },
  { id:'24/0002', name:'meriem sentouh', initials:'SM', year:'1CP', module:'ALSDS', email:'sara@esi.dz', submissions:5, progress:40 },
  { id:'23/0015', name:'lydia bouanani', initials:'KA', year:'2CP', module:'POO', email:'karim@esi.dz', submissions:10, progress:90 },
  { id:'23/0023', name:'Lyna Haddad', initials:'LH', year:'2CP', module:'SFSD', email:'lyna@esi.dz', submissions:6, progress:60 },
];

export const simColor = p => p > 70 ? '#EF4444' : p > 30 ? '#F59E0B' : '#10B981';
export const statusStyle = s => s === 'pending' ? { bg: '#FFFAEB', color: '#FFC533', icon: '⏳' } : s === 'flagged' ? { bg: '#FEF3F2', color: '#EF4444', icon: '🚩' } : { bg: '#ECFDF5', color: '#10B981', icon: '✓' };
export const langStyle = l => l === 'Python' ? { background: '#FFFAEB', color: '#FFC533' } : { background: '#EEF3FD', color: '#3B5BDB' };
export const modColor = m => ({ POO: { background: '#E8F0FE', color: '#3B5BDB' }, SFSD: { background: '#E6F7E6', color: '#10B981' }, ALSDD: { background: '#FFF4E6', color: '#FFC533' }, ALSDS: { background: '#F3E8FF', color: '#9B59B6' } }[m] || { background: '#F8F9FA', color: '#333' });