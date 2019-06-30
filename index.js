document.addEventListener('DOMContentLoaded', () => {
  const close = document.getElementById('close');
  const open = document.getElementById('open');
  const output = document.getElementById('output');

  // we want a function so we can call it later if it gets destroyed
  function createSSE() {
    const evtSource = new EventSource('/sse.php');

    evtSource.onopen = () => {
      output.innerHTML = '<p>Connection to server opened.</p>';
    };

    evtSource.onerror = () => {
      output.innerHTML = '<p>EventSource failed.</p>';
    };

    // the main event handler for any incoming messages
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

    return evtSource;
  }

  let evtSource = createSSE();

  close.onclick = () => {
    evtSource.close();
    output.innerHTML = '<p>Connection to server closed.</p>';
    open.style.display = 'initial';
    close.style.display = 'none';
  };

  open.onclick = () => {
    close.style.display = 'initial';
    open.style.display = 'none';
    // recreate the connection
    evtSource = createSSE();
  };
});
