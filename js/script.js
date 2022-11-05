'use strict'

onload = function() {
    const visorCronometro = this.document.querySelector('#visor-cronometro');
    const relogio = this.document.querySelector('#relogio');
    const dataCompleta = this.document.querySelector('#data-completa');
    const dataSimplificada = this.document.querySelector('#data-simplificada');
    const msg = this.document.querySelector('#complimetacao');
    let segundo = 0;
    let cronometro;

    function InserirZero(time) {
        return time > 10 ? time : `0${time}`;
    }

    const capturadorMes = (mes) => {
        const meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
        return meses[mes];
    };

    const capturadorSemana = function(semana) {
        const semanas = new Array('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');
        return semanas[semana];
    };

    const capturadorMSG = function(hora) {
        if(hora < 6) {
            return 'Boa madrugada!';
        }

        if(hora < 12) {
            return 'Bom dia!';
        }

        if(hora < 18) {
            return 'Boa tarde!';
        }

        if(hora < 23) {
            return 'Boa noite!';
        }

        return 'Erro';
    }

    const cronometragem = (s) => {
        const tempo = new Date(s * 1000);
        return tempo.toLocaleTimeString('pt-br', {
            timeZone: 'UTC',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    this.setInterval(() => {
        // Capturando valores de data e hora
        const data = new Date();
        const hora = data.getHours();
        const semana = data.getDay();
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        const semanaTXT = capturadorSemana(semana);
        const mesTXT = capturadorMes(mes - 1);
        const messageUser = capturadorMSG(hora);

        dataCompleta.textContent = `${semanaTXT} - ${InserirZero(dia)} de ${mesTXT} de ${ano}`;
        dataCompleta.setAttribute('datatime', `${ano}-${mes}-${dia}`)
        dataSimplificada.textContent = `${InserirZero(dia)}/${InserirZero(mes)}/${ano}`;
        dataSimplificada.setAttribute('datatime', `${ano}-${mes}-${dia}`)
        msg.textContent = messageUser;

        let horarioAtualizado = data.toLocaleTimeString('pt-br', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        relogio.textContent = horarioAtualizado;
        relogio.setAttribute('datatime', horarioAtualizado);
    }, 1000);

    window.addEventListener('click', function (event) {
        const element = event.target;
        
        if(element.classList.contains('btn-cronometro-iniciar')) {
            cronometro = setInterval(() => {
                segundo++;
                visorCronometro.textContent = cronometragem(segundo);
                visorCronometro.classList.add('iniciar-cronometro');
                visorCronometro.classList.remove('parar-cronometro');
                visorCronometro.classList.remove('padrao');
            }, 1000);
        }

        if(element.classList.contains('btn-cronometro-parar')) {
            this.clearInterval(cronometro);
            visorCronometro.classList.add('parar-cronometro');
            visorCronometro.classList.remove('iniciar-cronometro');
            visorCronometro.classList.remove('padrao');
        }

        if(element.classList.contains('btn-cronometro-zerar')) {
            this.clearInterval(cronometro);
            segundo = 0;
            visorCronometro.textContent = '00:00:00'
            visorCronometro.classList.add('padrao');
            visorCronometro.classList.remove('parar-cronometro');
            visorCronometro.classList.remove('iniciar-cronometro');
        }
    });
};