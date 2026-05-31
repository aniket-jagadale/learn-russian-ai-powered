import { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';

export function CertificatePage({ user, data }) {
  const [downloaded, setDownloaded] = useState(false);
  const certificateId = useMemo(() => `RL-${Date.now()}-${Math.floor(Math.random() * 10000)}`, []);
  const score = 80;
  const passed = score >= 50;

  const generatePdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.setFillColor(31, 75, 143);
    doc.rect(0, 0, doc.internal.pageSize.width, 120, 'F');
    doc.setFontSize(36);
    doc.setTextColor('#ffffff');
    doc.text('Certificate of Russian Language Completion', 40, 80);
    doc.setTextColor('#1f4b8f');
    doc.setFontSize(18);
    doc.text(`This is to certify that ${user.username}`, 40, 160);
    doc.text('has successfully completed the RusLearn AI course.', 40, 190);
    doc.text(`Score: ${score}`, 40, 220);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 40, 250);
    doc.text(`Certificate ID: ${certificateId}`, 40, 280);
    doc.save('ruslearn-certificate.pdf');
    setDownloaded(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-card rounded-[32px] border border-white/30 p-8 shadow-glass">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Сертификат</p>
            <h1 className="text-4xl font-bold text-rusgray dark:text-white">Certificate of Russian Language Completion</h1>
          </div>
          <button onClick={generatePdf} className="rounded-3xl bg-rusblue px-6 py-4 text-white transition hover:bg-[#163d79]">Скачать PDF</button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[3fr_1fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-xl dark:bg-slate-900">
            <p className="text-lg text-slate-600 dark:text-slate-300">Поздравляем, {user.username}! Вы успешно прошли финальный экзамен и получили сертификат.</p>
            <div className="mt-8 space-y-3 text-slate-700 dark:text-slate-200">
              <p><span className="font-semibold">Course Name:</span> RusLearn AI Russian Language Journey</p>
              <p><span className="font-semibold">Score:</span> {score}</p>
              <p><span className="font-semibold">Completion Date:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="font-semibold">Certificate ID:</span> {certificateId}</p>
            </div>
          </div>
          <div className="rounded-[32px] bg-slate-50 p-8 text-center dark:bg-slate-950">
            <QRCode value={certificateId} size={180} bgColor="#f8fafc" fgColor="#1f4b8f" />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Сканируйте для проверки сертификата.</p>
          </div>
        </div>
        {downloaded && <p className="mt-6 rounded-3xl bg-emerald-100 px-4 py-3 text-emerald-900">PDF файл успешно сгенерирован.</p>}
      </div>
    </div>
  );
}
