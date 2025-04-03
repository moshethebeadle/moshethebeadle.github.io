javascript:(function () {
    function generateICS() {
        const title = document.querySelector('.title').innerText.trim();
        let tables = document.querySelectorAll('table#Table4');
        let events = [];
        tables.forEach((table) => {
            let bracketHeader = table.previousElementSibling?.innerText.trim();
            let dateMatch = bracketHeader.match(/\b(\w+),\s(\w+)\s(\d{1,2}),\s(\d{4})\b/);
            if (!dateMatch) return;
            let [_, day, month, dayNum, year] = dateMatch;
            let gameDate = new Date(`${month} ${dayNum}, ${year}`);
            let rows = table.querySelectorAll('tr.tbody1, tr.tbody0');
            rows.forEach((row) => {
                let cells = row.querySelectorAll('td');
                if (cells.length < 11) return;
                let gameNumber = cells[0].innerText.trim();
                let venue = cells[1].innerText.trim();
                let time = cells[2].innerText.trim();
                let field = cells[3].innerText.trim();
                let homeTeam = cells[5].innerText.trim();
                let homeScore = cells[6].innerText.trim();
                let awayTeam = cells[8].innerText.trim();
                let awayScore = cells[9].innerText.trim();
                let refereeType = cells[10].innerText.trim();
                let group = cells[4].innerText.trim();
                let refereeRole = refereeType.includes('Asst') ? 'AR' : 'CR';
                let timeMatch = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
                if (!timeMatch) return;
                let [__, hour, minute, period] = timeMatch;
                hour = parseInt(hour);
                if (period.toUpperCase() === 'PM' && hour < 12) hour += 12;
                if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
                let startDateTime = new Date(gameDate);
                startDateTime.setHours(hour, minute, 0);
                let endDateTime = new Date(startDateTime);
                endDateTime.setMinutes(startDateTime.getMinutes() + 75);
                let event = `BEGIN:VEVENT\nUID:Affinity-UYSA-${gameNumber}\nDTSTAMP:${formatDateICS(new Date())}\nDTSTART:${formatDateICS(startDateTime)}\nDTEND:${formatDateICS(endDateTime)}\nSUMMARY:Game ${gameNumber} (${refereeRole}) - ${homeTeam} vs ${awayTeam}\nLOCATION:${venue}, Field ${field}\nDESCRIPTION:Game ${gameNumber}: ${homeTeam} (${homeScore}) vs ${awayTeam} (${awayScore}) at ${venue} on Field ${field}. Group: ${group} Referee Type: ${refereeType} Cal Title: ${title}\nEND:VEVENT\n`;
                events.push(event)
            });
        });
        let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Tournament Scheduler//Game Calendar//EN\n${events.join('\n')}\nEND:VCALENDAR`;
        let blob = new Blob([icsContent], {type: 'text/calendar'});
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'games_schedule.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }

    function formatDateICS(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    generateICS()
})();