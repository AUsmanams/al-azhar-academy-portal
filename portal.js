/* Al-Azhar Academy portal demonstration.
   All data is fictional and stored only in this browser using localStorage.
   A production system must use a secure server, database, authentication and permissions. */
const STORE_KEY = 'alAzharPortalDemoV1';
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const roles = {
  parent:{ar:'ولي الأمر',en:'Parent / Guardian',name:'Demo Parent'},
  student:{ar:'الطالب',en:'Student Portal',name:'Demo Student'},
  teacher:{ar:'المعلم والموظف',en:'Teacher / Staff',name:'Demo Teacher'},
  admin:{ar:'إدارة المدرسة',en:'School Management',name:'Demo Administrator'}
};
const navigation = {
  parent:[['overview','Overview','الرئيسية'],['fees','Fees & Payments','الرسوم'],['attendance','Attendance','الحضور'],['results','Results & Progress','النتائج'],['notices','Announcements','الإعلانات']],
  student:[['overview','Overview','الرئيسية'],['timetable','My Timetable','الجدول الدراسي'],['attendance','Attendance','الحضور'],['results','Results','النتائج'],['fees','Fees','الرسوم'],['notices','Announcements','الإعلانات']],
  teacher:[['overview','Overview','الرئيسية'],['attendance','Take Attendance','تسجيل الحضور'],['students','My Students','طلابي'],['results','Assessments','التقييم'],['notices','Announcements','الإعلانات']],
  admin:[['overview','Dashboard','لوحة الإدارة'],['admissions','Admissions','طلبات القبول'],['students','Student Management','إدارة الطلاب'],['staff','Staff & Teachers','الموظفون'],['attendance','Attendance','الحضور'],['fees','Fees & Payments','الرسوم'],['results','Results & Assessments','النتائج'],['notices','Notices & Announcements','الإعلانات'],['reports','Reports','التقارير'],['settings','System Settings','الإعدادات']]
};
const seed = {
  students:[
    {id:'AAZ-001',name:'Amina Sample',nameAr:'أمينة نموذج',className:'Primary 4',guardian:'Hauwa Sample',phone:'08000000001',status:'Active'},
    {id:'AAZ-002',name:'Yusuf Sample',nameAr:'يوسف نموذج',className:'Primary 5',guardian:'Ibrahim Sample',phone:'08000000002',status:'Active'},
    {id:'AAZ-003',name:'Maryam Sample',nameAr:'مريم نموذج',className:'JSS 1',guardian:'Fatima Sample',phone:'08000000003',status:'Active'},
    {id:'AAZ-004',name:'Abdullahi Sample',nameAr:'عبد الله',className:'Nursery 2',guardian:'Musa Sample',phone:'08000000007',status:'Active'},
    {id:'AAZ-005',name:'Zainab Sample',nameAr:'زينب',className:'Primary 1',guardian:'Bilkisu Sample',phone:'08000000008',status:'Active'},
    {id:'AAZ-006',name:'Usman Sample',nameAr:'عثمان',className:'Primary 2',guardian:'Sani Sample',phone:'08000000009',status:'Active'},
    {id:'AAZ-007',name:'Hafsat Sample',nameAr:'حفصة',className:'Primary 3',guardian:'Aliyu Sample',phone:'08000000010',status:'Active'},
    {id:'AAZ-008',name:'Ibrahim Sample',nameAr:'إبراهيم',className:'JSS 2',guardian:'Abubakar Sample',phone:'08000000011',status:'Active'},
    {id:'AAZ-009',name:'Aisha Sample',nameAr:'عائشة',className:'JSS 3',guardian:'Mariam Sample',phone:'08000000012',status:'Active'},
    {id:'AAZ-010',name:'Bilal Sample',nameAr:'بلال',className:'SS 1',guardian:'Hassan Sample',phone:'08000000013',status:'Active'}
  ],
  fees:[
    {id:'PAY-1001',studentId:'AAZ-001',student:'Amina Sample',className:'Primary 4',term:'First Term 2026/2027',amount:45000,method:'Bank transfer',reference:'DEMO-TRX-001',date:'2026-10-15',status:'Verified',receipt:'Demo receipt'},
    {id:'PAY-1002',studentId:'AAZ-002',student:'Yusuf Sample',className:'Primary 5',term:'First Term 2026/2027',amount:30000,method:'Bank deposit',reference:'DEMO-TRX-002',date:'2026-10-16',status:'Verified',receipt:'—'}
  ],
  admissions:[
    {id:'ADM-001',name:'Khadijah Example',level:'Primary',guardian:'Aisha Example',phone:'08000000004',date:'2026-11-01',status:'Pending'}
  ],
  staff:[
    {id:'ST-001',name:'Teacher Example',role:'Class Teacher',className:'Primary 4',phone:'08000000005',status:'Active'},
    {id:'ST-002',name:'Bursar Example',role:'Finance Officer',className:'Administration',phone:'08000000006',status:'Active'}
  ],
  attendance:[
    {id:'ATT-001',date:'2026-11-05',className:'Primary 4',studentId:'AAZ-001',student:'Amina Sample',status:'Present',markedBy:'Teacher Example'},
    {id:'ATT-002',date:'2026-11-05',className:'Primary 5',studentId:'AAZ-002',student:'Yusuf Sample',status:'Present',markedBy:'Teacher Example'},
    {id:'ATT-003',date:'2026-11-05',className:'JSS 1',studentId:'AAZ-003',student:'Maryam Sample',status:'Absent',markedBy:'Teacher Example'}
  ],
  results:[
    {id:'RES-001',studentId:'AAZ-001',student:'Amina Sample',className:'Primary 4',subject:'Qur’an Studies',term:'First Term 2026/2027',score:88,grade:'A'},
    {id:'RES-002',studentId:'AAZ-001',student:'Amina Sample',className:'Primary 4',subject:'Arabic Language',term:'First Term 2026/2027',score:92,grade:'A'},
    {id:'RES-003',studentId:'AAZ-001',student:'Amina Sample',className:'Primary 4',subject:'Mathematics',term:'First Term 2026/2027',score:81,grade:'A'}
  ],
  notices:[
    {id:'NOT-001',title:'Welcome to the portal demonstration',body:'This is a sample announcement. Official school notices will be published by authorised staff.',date:'2026-11-06',audience:'Everyone'}
  ],
  timetable:[
    {day:'Sunday',time:'08:00 – 08:40',subject:'Qur’an Studies',room:'Class 4'},
    {day:'Sunday',time:'08:40 – 09:20',subject:'Arabic Language',room:'Class 4'},
    {day:'Sunday',time:'09:40 – 10:20',subject:'Mathematics',room:'Class 4'},
    {day:'Monday',time:'08:00 – 08:40',subject:'Islamic Studies',room:'Class 4'}
  ]
};
let data = loadData();
let currentRole = null;
let selectedStudentId = 'AAZ-001';
let currentView = 'overview';
let toastTimer;
function loadData(){
  try { const saved=localStorage.getItem(STORE_KEY); return saved ? {...structuredClone(seed),...JSON.parse(saved)} : structuredClone(seed); }
  catch { return structuredClone(seed); }
}
function saveData(){ localStorage.setItem(STORE_KEY,JSON.stringify(data)); }
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function money(value){return '₦'+Number(value||0).toLocaleString('en-NG');}
function today(){return new Date().toISOString().slice(0,10);}
function toast(message){const box=$('#toast');box.textContent=message;box.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),2600);}
function enterRole(role){
  currentRole=role;currentView='overview';selectedStudentId='AAZ-001';
  $('#welcomeScreen').classList.add('hidden');$('#workspace').classList.remove('hidden');
  $('#sideRoleAr').textContent=roles[role].en;$('#sideRoleEn').textContent=roles[role].ar;
  $('#profileName').textContent=roles[role].name;$('#profileRole').textContent=roles[role].en;$('#profileInitial').textContent=roles[role].name.slice(0,1);
  renderNavigation();renderView();
}
function renderNavigation(){
  $('#sideNav').innerHTML=navigation[currentRole].map(([id,en,ar])=>'<button data-view="'+id+'" class="'+(id===currentView?'active':'')+'">'+en+'<span>'+ar+'</span></button>').join('');
}
function goView(view){currentView=view;renderNavigation();renderView();window.scrollTo({top:0,behavior:'smooth'});}
function stat(label,value,note){return '<article class="stat-card"><small>'+label+'</small><strong>'+value+'</strong><em>'+note+'</em></article>';}
function table(headers,rows){return '<div class="table-wrap"><table><thead><tr>'+headers.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+(rows.length?rows.map(row=>'<tr>'+row.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join(''):'<tr><td colspan="'+headers.length+'" class="empty-state">No records available yet</td></tr>')+'</tbody></table></div>';}
function card(title,content){return '<section class="panel-card"><h3>'+title+'</h3>'+content+'</section>';}
function banner(title,desc){return '<section class="welcome-banner"><h2>'+title+'</h2><p>'+desc+'</p></section>';}
function renderView(){
  const titles={overview:['Dashboard','لوحة التحكم'],admissions:['Admissions','طلبات القبول'],students:['Student Management','إدارة الطلاب'],staff:['Staff & Teachers','الموظفون'],attendance:['Attendance','الحضور'],fees:['Fees & Payments','الرسوم'],results:['Results & Assessments','النتائج'],notices:['Notices & Announcements','الإعلانات'],reports:['Reports & Statistics','التقارير'],settings:['System Settings','الإعدادات'],timetable:['My Timetable','الجدول الدراسي']};
  const [englishTitle,arabicLabel]=titles[currentView]||titles.overview;
  $('#pageKicker').textContent=roles[currentRole].en;$('#pageTitle').textContent=englishTitle;$('#pageSubtitle').textContent='Al-Azhar Academy demonstration';
  const renderer={overview:overviewView,fees:feesView,attendance:attendanceView,results:resultsView,notices:noticesView,students:studentsView,staff:staffView,admissions:admissionsView,reports:reportsView,settings:settingsView,timetable:timetableView};
  $('#viewContent').innerHTML=(renderer[currentView]||overviewView)();
  bindViewActions();
}
function myStudent(){return data.students.find(s=>s.id===selectedStudentId)||data.students[0];}
function roleStudent(){return currentRole==='parent'||currentRole==='student'?myStudent():null;}
function overviewView(){
  if(currentRole==='admin') return banner('Welcome to School Management','Manage admissions, learners, staff, attendance, fees and academic records.')+
    '<div class="stats-grid">'+stat('Total Students',data.students.length,'Registered sample learners')+stat('Admission Applications',data.admissions.length,'Applications in demo')+stat('Recorded Payments',data.fees.length,'Recorded fee entries')+stat('Staff Members',data.staff.length,'Sample staff accounts')+'</div>'+
    '<div class="panel-grid">'+card('Recent Payments',table(['Student','Amount','Reference','Status'],data.fees.slice(-4).reverse().map(x=>[escapeHTML(x.student),money(x.amount),escapeHTML(x.reference),'<span class="status">'+escapeHTML(x.status)+'</span>'])))+card('Recent Admission Applications',table(['Applicant','Level','Date','Status'],data.admissions.slice(-4).reverse().map(x=>[escapeHTML(x.name),escapeHTML(x.level),x.date,escapeHTML(x.status)])))+'</div>'+
    card('Quick Actions','<div class="action-row"><button class="primary-btn" data-go="students">Add Student</button><button class="soft-btn" data-go="fees">Record Payment</button><button class="soft-btn" data-go="notices">Publish Notice</button><button class="soft-btn" data-go="reports">View Reports</button></div>');
  if(currentRole==='teacher') return banner('Welcome to the Teacher Workspace','Manage your class, attendance, assessments and student progress.')+
    '<div class="stats-grid">'+stat('Learners',data.students.length,'In sample classes')+stat('Attendance Records',data.attendance.length,'Recorded entries')+stat('Assessments',data.results.length,'Sample marks')+stat('School Notices',data.notices.length,'School notices')+'</div>'+
    '<div class="panel-grid">'+card('My Class',table(['Student','Admission No.','Class'],data.students.map(s=>[escapeHTML(s.name),s.id,escapeHTML(s.className)])))+card('Teacher Tools','<div class="action-row"><button class="primary-btn" data-go="attendance">تسجيل الحضور · Take attendance</button><button class="soft-btn" data-go="results">إدخال الدرجات · Enter results</button><button class="soft-btn" data-go="students">عرض الطلاب · View students</button></div>')+'</div>';
  const s=roleStudent();
  return banner(currentRole==='parent'?'Parent / Guardian Dashboard':'Student Dashboard','View academic progress, attendance, school fees and school announcements.')+
    card('Select a Sample Learner','<div class="field"><label>Student account / Admission number</label><select id="sampleStudentSelect">'+data.students.map(x=>'<option value="'+x.id+'" '+(x.id===s.id?'selected':'')+'>'+x.id+' — '+escapeHTML(x.name)+' ('+escapeHTML(x.className)+')</option>').join('')+'</select></div>')+
    '<div class="stats-grid">'+stat('Learner',escapeHTML(s.name),'Admission: '+s.id)+stat('Class',escapeHTML(s.className),'Current class')+stat('Payments',data.fees.filter(f=>f.studentId===s.id).length,'Recorded payments')+stat('Results',data.results.filter(r=>r.studentId===s.id).length,'Available assessments')+'</div>'+
    '<div class="panel-grid">'+card('بيانات Learner profile','<p><b>'+escapeHTML(s.nameAr)+'</b><br>'+escapeHTML(s.name)+'<br>'+escapeHTML(s.className)+'<br>Guardian: '+escapeHTML(s.guardian)+'</p>')+card('Quick Links','<div class="action-row"><button class="primary-btn" data-go="fees">عرض الرسوم · View fees</button><button class="soft-btn" data-go="attendance">الحضور · Attendance</button><button class="soft-btn" data-go="results">Results</button></div>')+'</div>'+
    card('Latest Announcements',noticesList());
}
function feesView(){
  if(currentRole==='admin') return card('Record a Verified School-Fee Payment',paymentForm())+
    card('Fee & Payment Register',table(['Student','Class','Term','Amount','Method','Reference','Date','Status'],data.fees.slice().reverse().map(f=>[escapeHTML(f.student),escapeHTML(f.className),escapeHTML(f.term),money(f.amount),escapeHTML(f.method),escapeHTML(f.reference),f.date,'<span class="status">'+escapeHTML(f.status)+'</span>'])));
  const s=roleStudent();const records=data.fees.filter(f=>f.studentId===s.id);
  return banner('School Fees & Payment History','View payments recorded and verified by authorised school staff.')+
    '<div class="stats-grid">'+stat('Total Paid',money(records.reduce((a,b)=>a+b.amount,0)),'All recorded payments')+stat('Payment Entries',records.length,'Verified sample entries')+stat('Academic Term','2026/27','Demonstration term')+stat('Record Status',records.length?'Recorded':'No records','Contact school for questions')+'</div>'+
    card('Payment History',table(['Term','Amount','Method','Reference','Date','Status'],records.map(f=>[escapeHTML(f.term),money(f.amount),escapeHTML(f.method),escapeHTML(f.reference),f.date,'<span class="status">'+escapeHTML(f.status)+'</span>'])))+
    '<p>Payments are entered by authorised school staff after the school confirms receipt.</p>';
}
function paymentForm(){return '<form id="paymentForm" class="form-grid"><div class="field"><label>رقم الطالب · Admission number</label><select name="studentId" required>'+data.students.map(s=>'<option value="'+s.id+'">'+s.id+' — '+escapeHTML(s.name)+'</option>').join('')+'</select></div><div class="field"><label>Academic Term</label><select name="term"><option>First Term 2026/2027</option><option>Second Term 2026/2027</option><option>Third Term 2026/2027</option></select></div><div class="field"><label>المبلغ المستلم · Amount received (₦)</label><input type="number" name="amount" min="1" required></div><div class="field"><label>طريقة الدفع · Payment method</label><select name="method" required><option>Bank transfer</option><option>Bank deposit</option><option>Cash</option><option>Other approved method</option></select></div><div class="field"><label>رقم العملية أو الإيصال · Transaction / receipt reference</label><input name="reference" required></div><div class="field"><label>تاريخ الاستلام · Date received</label><input name="date" type="date" value="'+today()+'" required></div><div class="field"><label>حالة التحقق · Verification status</label><select name="status"><option>Verified</option><option>Pending verification</option></select></div><div class="field"><label>مرفق الإيصال · Receipt evidence (demo only)</label><input type="file" name="receipt" accept="image/*,.pdf"></div><div class="field full"><button class="primary-btn" type="submit">حفظ سجل الدفعة · Save payment record</button><small>الملف المختار لا يُرفع إلى خادم في هذه النسخة التجريبية. · Receipt files are not uploaded in this prototype.</small></div></form>';}
function attendanceView(){
  if(currentRole==='admin'||currentRole==='teacher'){
    const form='<form id="attendanceForm" class="form-grid"><div class="field"><label>Class</label><select name="className"><option>Nursery 1</option><option>Primary 4</option><option>Primary 5</option><option>JSS 1</option><option>SS 1</option></select></div><div class="field"><label>التاريخ · Date</label><input name="date" type="date" value="'+today()+'" required></div><div class="field"><label>الطالب · Student</label><select name="studentId">'+data.students.map(s=>'<option value="'+s.id+'">'+escapeHTML(s.name)+' ('+s.id+')</option>').join('')+'</select></div><div class="field"><label>الحالة · Attendance status</label><select name="status"><option>Present</option><option>Absent</option><option>Late</option><option>Excused</option></select></div><div class="field full"><button class="primary-btn" type="submit">حفظ الحضور · Save attendance</button></div></form>';
    return card('Daily Attendance Entry',form)+card('Attendance Register',attendanceTable());
  }
  const s=roleStudent(),rows=data.attendance.filter(a=>a.studentId===s.id);
  return banner('Attendance Record','Review the learner’s attendance history and daily status.')+card('Attendance History',table(['Date','Class','Status','Recorded by'],rows.map(a=>[a.date,escapeHTML(a.className),'<span class="status">'+escapeHTML(a.status)+'</span>',escapeHTML(a.markedBy)])));
}
function attendanceTable(){return table(['Date','Student','Class','Status','Recorded by'],data.attendance.slice().reverse().map(a=>[a.date,escapeHTML(a.student),escapeHTML(a.className),escapeHTML(a.status),escapeHTML(a.markedBy)]));}
function resultsView(){
  if(currentRole==='admin'||currentRole==='teacher') return card('Add Assessment Result','<form id="resultForm" class="form-grid"><div class="field"><label>الطالب · Student</label><select name="studentId">'+data.students.map(s=>'<option value="'+s.id+'">'+escapeHTML(s.name)+'</option>').join('')+'</select></div><div class="field"><label>المادة · Subject</label><input name="subject" required placeholder="Qur’an Studies / Mathematics"></div><div class="field"><label>Continuous Assessment (0–40)</label><input type="number" name="ca" min="0" max="40" required></div><div class="field"><label>Final Examination (0–60)</label><input type="number" name="exam" min="0" max="60" required></div><div class="field"><label>Academic Term</label><select name="term"><option>First Term 2026/2027</option><option>Second Term 2026/2027</option><option>Third Term 2026/2027</option></select></div><div class="field full"><button class="primary-btn" type="submit">حفظ النتيجة · Save result</button></div></form>')+card('سجل Results register',resultsTable());
  const s=roleStudent();return banner('Academic Results & Progress','View results across Islamic Studies and general academic subjects.')+card('Available Results',table(['Subject','Term','CA','Exam','Total','Grade'],data.results.filter(r=>r.studentId===s.id).map(r=>[escapeHTML(r.subject),escapeHTML(r.term),r.ca??'—',r.exam??'—',r.score+'/100',r.grade])));
}
function resultsTable(){return table(['Student','Class','Subject','Term','CA','Exam','Total','Grade'],data.results.slice().reverse().map(r=>[escapeHTML(r.student),escapeHTML(r.className),escapeHTML(r.subject),escapeHTML(r.term),r.ca??'—',r.exam??'—',r.score,r.grade]));}
function noticesList(){return data.notices.slice().reverse().map(n=>'<article class="panel-card"><h3>'+escapeHTML(n.title)+'</h3><p>'+escapeHTML(n.body)+'</p><small>'+n.date+' · '+escapeHTML(n.audience)+'</small></article>').join('')||'<p class="empty-state">No announcements have been published.</p>';}
function noticesView(){
  let create='';if(currentRole==='admin'||currentRole==='teacher')create=card('Publish a New Announcement','<form id="noticeForm" class="form-grid"><div class="field"><label>عنوان الإعلان · Title</label><input name="title" required></div><div class="field"><label>الفئة المستهدفة · Audience</label><select name="audience"><option>Everyone</option><option>Parents</option><option>Students</option><option>Teachers</option></select></div><div class="field full"><label>نص الإعلان · Message</label><textarea name="body" required></textarea></div><div class="field full"><button class="primary-btn" type="submit">نشر الإعلان · Publish</button></div></form>');
  return create+card('School Announcements',noticesList());
}
function studentsView(){
  if(currentRole==='student'||currentRole==='parent'){const s=myStudent();return card('بيانات الطالب · Student profile','<p><b>'+escapeHTML(s.nameAr)+'</b><br>'+escapeHTML(s.name)+'<br>Admission: '+s.id+'<br>Class: '+escapeHTML(s.className)+'<br>Guardian: '+escapeHTML(s.guardian)+'<br>Contact: '+escapeHTML(s.phone)+'</p>');}
  const add=currentRole==='admin'?card('Register a New Learner','<form id="studentForm" class="form-grid"><div class="field"><label>رقم القيد · Admission number</label><input name="id" required placeholder="AAZ-004"></div><div class="field"><label>الاسم بالإنجليزية · English name</label><input name="name" required></div><div class="field"><label>الاسم بالعربية · Arabic name</label><input name="nameAr" dir="rtl"></div><div class="field"><label>Class</label><select name="className"><option>Nursery 1</option><option>Primary 1</option><option>Primary 4</option><option>Primary 5</option><option>JSS 1</option><option>SS 1</option></select></div><div class="field"><label>ولي الأمر · Guardian</label><input name="guardian" required></div><div class="field"><label>الهاتف · Phone</label><input name="phone"></div><div class="field full"><button class="primary-btn" type="submit">إضافة الطالب · Add learner</button></div></form>'):'';
  return add+card('Student Register',table(['Admission No.','Student','Arabic name','Class','Guardian','Status'],data.students.map(s=>[s.id,escapeHTML(s.name),escapeHTML(s.nameAr),escapeHTML(s.className),escapeHTML(s.guardian),escapeHTML(s.status)])));
}
function staffView(){return card('Add a Staff Member','<form id="staffForm" class="form-grid"><div class="field"><label>رقم الموظف · Staff ID</label><input name="id" required placeholder="ST-003"></div><div class="field"><label>الاسم · Full name</label><input name="name" required></div><div class="field"><label>الوظيفة · Role</label><select name="role"><option>Class Teacher</option><option>Head Teacher</option><option>Finance Officer</option><option>Administrator</option><option>Islamic Studies Teacher</option><option>Arabic Teacher</option></select></div><div class="field"><label>الفصل أو القسم · Class / Department</label><input name="className"></div><div class="field"><label>الهاتف · Phone</label><input name="phone"></div><div class="field full"><button class="primary-btn" type="submit">إضافة الموظف · Add staff</button></div></form>')+card('Staff Directory',table(['Staff ID','Name','Role','Class / Department','Phone','Status'],data.staff.map(s=>[s.id,escapeHTML(s.name),escapeHTML(s.role),escapeHTML(s.className),escapeHTML(s.phone),escapeHTML(s.status)])));
}
function admissionsView(){return card('Record an Admission Application','<form id="admissionForm" class="form-grid"><div class="field"><label>اسم الطالب · Applicant name</label><input name="name" required></div><div class="field"><label>المستوى · Level</label><select name="level"><option>Nursery</option><option>Primary</option><option>Secondary</option></select></div><div class="field"><label>ولي الأمر · Parent / guardian</label><input name="guardian" required></div><div class="field"><label>الهاتف · Phone</label><input name="phone" required></div><div class="field full"><button class="primary-btn" type="submit">حفظ الطلب · Save application</button></div></form>')+card('Admission Applications',table(['Reference','Applicant','Level','Guardian','Phone','Date','Status'],data.admissions.map(a=>[a.id,escapeHTML(a.name),escapeHTML(a.level),escapeHTML(a.guardian),escapeHTML(a.phone),a.date,escapeHTML(a.status)])));
}
function reportsView(){const total=data.fees.reduce((sum,f)=>sum+Number(f.amount),0);return '<div class="stats-grid">'+stat('Total Learners',data.students.length,'Sample records')+stat('Total Fee Receipts',money(total),'Verified + demo records')+stat('Attendance Entries',data.attendance.length,'Entries')+stat('Admission Applications',data.admissions.length,'Applications')+'</div>'+card('Export Demonstration Data','<p>Download a JSON backup of the sample data stored in this browser. It does not contain records from a school server.</p><button class="primary-btn" data-export>تنزيل البيانات · Download JSON</button>')+card('Important Note','<p>Production reports can include term summaries, outstanding fees, class attendance, subject performance and admissions. Management must approve the reporting rules.</p>');}
function settingsView(){return card('Demo Settings','<p>Demo records are stored only in this browser.</p><div class="action-row"><button class="soft-btn" data-export>Export Backup</button><button class="danger-btn" data-reset>Reset Demo Data</button></div><p>Resetting will erase changes made to this browser’s demonstration records.</p>')+card('Production Readiness','<p>A production system requires a secure server and database, individual logins, encrypted connections, backups, role-based permissions, audit logs and student-data protection policies.</p>');}
function timetableView(){return card('Weekly Timetable',table(['Day','Time','Subject','Room'],data.timetable.map(t=>[t.day,t.time,escapeHTML(t.subject),escapeHTML(t.room)])));}
function bindViewActions(){
  const sampleSelect=$('#sampleStudentSelect');if(sampleSelect)sampleSelect.addEventListener('change',()=>{selectedStudentId=sampleSelect.value;renderView();});
  $('[data-go]').forEach(b=>b.addEventListener('click',()=>goView(b.dataset.go)));
  const payment=$('#paymentForm');if(payment)payment.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(payment);const s=data.students.find(x=>x.id===f.get('studentId'));data.fees.push({id:'PAY-'+Date.now(),studentId:s.id,student:s.name,className:s.className,term:f.get('term'),amount:Number(f.get('amount')),method:f.get('method'),reference:f.get('reference'),date:f.get('date'),status:f.get('status'),receipt:'File not uploaded'});saveData();toast('تم تسجيل الدفعة التجريبية · Demo payment recorded');renderView();});
  const attendance=$('#attendanceForm');if(attendance)attendance.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(attendance),s=data.students.find(x=>x.id===f.get('studentId'));data.attendance.push({id:'ATT-'+Date.now(),date:f.get('date'),className:f.get('className'),studentId:s.id,student:s.name,status:f.get('status'),markedBy:roles[currentRole].name});saveData();toast('تم حفظ سجل الحضور · Attendance saved');renderView();});
  const result=$('#resultForm');if(result)result.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(result),s=data.students.find(x=>x.id===f.get('studentId')),ca=Number(f.get('ca')),exam=Number(f.get('exam')),score=ca+exam;if(ca<0||ca>40||exam<0||exam>60){toast('Check CA and examination limits');return;}data.results.push({id:'RES-'+Date.now(),studentId:s.id,student:s.name,className:s.className,subject:f.get('subject'),term:f.get('term'),ca,exam,score,grade:score>=80?'A':score>=70?'B':score>=60?'C':score>=50?'D':'F'});saveData();toast('تم حفظ النتيجة · Result saved');renderView();});
  const notice=$('#noticeForm');if(notice)notice.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(notice);data.notices.push({id:'NOT-'+Date.now(),title:f.get('title'),body:f.get('body'),audience:f.get('audience'),date:today()});saveData();toast('تم نشر الإعلان التجريبي · Demo notice published');renderView();});
  const student=$('#studentForm');if(student)student.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(student);if(data.students.some(s=>s.id===f.get('id'))){toast('رقم القيد موجود بالفعل · Admission number already exists');return;}data.students.push({id:f.get('id'),name:f.get('name'),nameAr:f.get('nameAr'),className:f.get('className'),guardian:f.get('guardian'),phone:f.get('phone'),status:'Active'});saveData();toast('تم تسجيل الطالب · Student added');renderView();});
  const staff=$('#staffForm');if(staff)staff.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(staff);data.staff.push({id:f.get('id'),name:f.get('name'),role:f.get('role'),className:f.get('className'),phone:f.get('phone'),status:'Active'});saveData();toast('تمت إضافة الموظف · Staff added');renderView();});
  const admission=$('#admissionForm');if(admission)admission.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(admission);data.admissions.push({id:'ADM-'+String(data.admissions.length+1).padStart(3,'0'),name:f.get('name'),level:f.get('level'),guardian:f.get('guardian'),phone:f.get('phone'),date:today(),status:'Pending'});saveData();toast('تم تسجيل طلب القبول · Application saved');renderView();});
  $$('[data-export]').forEach(b=>b.addEventListener('click',exportData));
  const reset=$('[data-reset]');if(reset)reset.addEventListener('click',()=>{if(confirm('Reset all demo data in this browser?')){data=structuredClone(seed);saveData();toast('تمت إعادة بيانات العرض · Demo reset');renderView();}});
}
function exportData(){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='al-azhar-demo-data.json';a.click();URL.revokeObjectURL(url);}
$$('[data-enter]').forEach(button=>button.addEventListener('click',()=>enterRole(button.dataset.enter)));
$('#switchRole').addEventListener('click',()=>{$('#workspace').classList.add('hidden');$('#welcomeScreen').classList.remove('hidden');currentRole=null;});
