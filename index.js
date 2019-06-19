document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  const output = document.getElementById('output');
  const evtSource = new EventSource('/sse.php');

  evtSource.onopen = () => {
    output.innerHTML = '<p>Connection to server opened.</p>';
  };

  evtSource.onerror = () => {
    output.innerHTML = '<p>EventSource failed.</p>';
  };

  evtSource.onmessage = ({ data }) => {
    const { time } = JSON.parse(data);
    const formatted = new Intl.DateTimeFormat('en-CA', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(Date.parse(time));
    const code = document.createElement('p');
    code.textContent = formatted;
    output.insertBefore(code, output.firstChild);
  };

  button.onclick = () => {
    evtSource.close();
    output.innerHTML = '<p>Connection to server closed.</p>';
  };
});
