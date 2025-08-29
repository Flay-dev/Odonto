// lógica admin// Navegação lateral
function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(s => s.classList.add('hidden'));
  document.getElementById(id)?.classList.remove('hidden');

  const titulos = {
    dashboard: 'Dashboard',
    agendamentos: 'Agendamentos',
    pacientes: 'Pacientes',
    financeiro: 'Financeiro',
    servicos: 'Serviços',
    configuracoes: 'Configurações',
  };
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = titulos[id] || '';

  document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('bg-blue-50','text-blue-600'));
}

// Dados exemplo
const agendamentosData = [
  { id: 1, paciente: 'Maria Silva', servico: 'Limpeza',     data: '2024-01-15', hora: '09:00', status: 'confirmado' },
  { id: 2, paciente: 'João Santos', servico: 'Consulta',     data: '2024-01-15', hora: '10:30', status: 'pendente'   },
  { id: 3, paciente: 'Ana Costa',   servico: 'Clareamento',  data: '2024-01-16', hora: '14:00', status: 'confirmado' },
  { id: 4, paciente: 'Pedro Lima',  servico: 'Ortodontia',   data: '2024-01-16', hora: '15:30', status: 'cancelado'  },
];

const pacientesData = [
  { id: 1, nome: 'Maria Silva', telefone: '(11) 99999-1111', email: 'maria@email.com', ultimaConsulta: '2024-01-10' },
  { id: 2, nome: 'João Santos', telefone: '(11) 99999-2222', email: 'joao@email.com',  ultimaConsulta: '2024-01-08' },
  { id: 3, nome: 'Ana Costa',   telefone: '(11) 99999-3333', email: 'ana@email.com',   ultimaConsulta: '2024-01-05' },
];

const servicosData = [
  { id: 1, nome: 'Limpeza Dental',  preco: 80,  duracao: '30 min', descricao: 'Limpeza e profilaxia' },
  { id: 2, nome: 'Clareamento',     preco: 200, duracao: '60 min', descricao: 'Clareamento dental' },
  { id: 3, nome: 'Consulta Geral',  preco: 100, duracao: '45 min', descricao: 'Consulta de rotina' },
];

// Helpers
function iniciais(nome){ return nome.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(); }
function statusClass(s){ return `status-${s}`; } // combina com suas classes .status-confirmado/pendente/cancelado

// Agendamentos
function carregarAgendamentos() {
  const tbody = document.getElementById('agendamentosTable');
  if (!tbody) return;
  tbody.innerHTML = '';

  agendamentosData.forEach(a => {
    const tr = document.createElement('tr');
    tr.className = 'table-row';
    tr.innerHTML = `
      <td class="px-6 py-4">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <span class="font-medium text-gray-600">${iniciais(a.paciente)}</span>
          </div>
          <span class="font-medium text-gray-900">${a.paciente}</span>
        </div>
      </td>
      <td class="px-6 py-4 text-gray-900">${a.servico}</td>
      <td class="px-6 py-4 text-gray-900">${a.data} ${a.hora}</td>
      <td class="px-6 py-4">
        <span class="status-badge ${statusClass(a.status)}">${a.status}</span>
      </td>
      <td class="px-6 py-4">
        <div class="flex space-x-2">
          <button class="text-blue-600 hover:text-blue-800" data-edit="${a.id}">✏</button>
          <button class="text-red-600 hover:text-red-800"  data-del="${a.id}">🗑</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('[data-edit]')) alert(`Editando agendamento ${t.dataset.edit}`);
    if (t.matches('[data-del]') && confirm('Excluir este agendamento?')) alert(`Agendamento ${t.dataset.del} excluído`);
  });
}

// Pacientes
function carregarPacientes() {
  const container = document.getElementById('pacientesList');
  if (!container) return;
  container.innerHTML = '';

  pacientesData.forEach(p => {
    const div = document.createElement('div');
    div.className = 'p-4 hover:bg-gray-50 cursor-pointer';
    div.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="font-bold text-blue-600">${iniciais(p.nome)}</span>
          </div>
          <div>
            <p class="font-medium text-gray-900">${p.nome}</p>
            <p class="text-sm text-gray-600">${p.telefone}</p>
            <p class="text-sm text-gray-500">Última consulta: ${p.ultimaConsulta}</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="text-blue-600 hover:text-blue-800" data-edit="${p.id}">✏</button>
          <button class="text-red-600 hover:text-red-800"  data-del="${p.id}">🗑</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  container.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('[data-edit]')) alert(`Editando paciente ${t.dataset.edit}`);
    if (t.matches('[data-del]') && confirm('Excluir este paciente?')) alert(`Paciente ${t.dataset.del} excluído`);
  });
}

// Serviços
function carregarServicos() {
  const container = document.getElementById('servicosList');
  if (!container) return;
  container.innerHTML = '';

  servicosData.forEach(s => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-sm p-6 card-hover';
    card.innerHTML = `
      <h4 class="text-lg font-semibold text-gray-800 mb-2">${s.nome}</h4>
      <p class="text-gray-600 mb-4">${s.descricao}</p>
      <div class="flex justify-between items-center mb-4">
        <span class="text-2xl font-bold text-blue-600">R$ ${s.preco}</span>
        <span class="text-sm text-gray-500">${s.duracao}</span>
      </div>
      <div class="flex space-x-2">
        <button class="flex-1 bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-colors" data-edit="${s.id}">Editar</button>
        <button class="px-4 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors" data-del="${s.id}">🗑</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('[data-edit]')) alert(`Editando serviço ${t.dataset.edit}`);
    if (t.matches('[data-del]') && confirm('Excluir este serviço?')) alert(`Serviço ${t.dataset.del} excluído`);
  });
}

// Data e hora do header
function atualizarDataHora() {
  const agora = new Date();
  document.getElementById('currentDate').textContent = agora.toLocaleDateString('pt-BR');
  document.getElementById('currentTime').textContent = agora.toLocaleTimeString('pt-BR');
}

// Gráficos
function criarGraficos() {
  const linha = document.getElementById('consultasChart')?.getContext('2d');
  const pizza = document.getElementById('servicosChart')?.getContext('2d');
  if (!linha || !pizza) return;

  new Chart(linha, {
    type: 'line',
    data: {
      labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
      datasets: [{
        label: 'Consultas',
        data: [65, 78, 90, 81, 95, 102],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.12)',
        tension: 0.4
      }]
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } } }
  });

  new Chart(pizza, {
    type: 'doughnut',
    data: {
      labels: ['Limpeza','Clareamento','Ortodontia','Implantes'],
      datasets: [{ data: [35,25,20,20], backgroundColor: ['#3B82F6','#10B981','#F59E0B','#EF4444'] }]
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // marca item ativo do menu ao clicar
  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('bg-blue-50','text-blue-600'));
      e.currentTarget.classList.add('bg-blue-50','text-blue-600');
    });
  });

  mostrarSecao('dashboard');
  atualizarDataHora();
  setInterval(atualizarDataHora, 1000);

  carregarAgendamentos();
  carregarPacientes();
  carregarServicos();

  setTimeout(criarGraficos, 100);
});
