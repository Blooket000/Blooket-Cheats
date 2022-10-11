let i = document.createElement('iframe');
document.body.append(i);
window.alert = i.contentWindow.alert.bind(window);
window.prompt = i.contentWindow.prompt.bind(window);
window.confirm = i.contentWindow.confirm.bind(window);
i.remove();
var axios = Object.values(webpackJsonp.push([[], { ['']: (_, a, b) => { a.cache = b.c }, }, [['']],]).cache).filter((x) => x.exports?.a?.get)[3].exports.a;

axios.get("/api/users").then(async ({ data: { name, tokens } }) => {
    let prices = Object.values(webpackJsonp.push([[], { ['']: (_, a, b) => { a.cache = b.c }, }, [['']],]).cache).find(x => x?.exports?.a?.Safari).exports.a;
    let box = prompt("Which box do you want to open? (ex: \"Ice Monster\")");
    if (!Object.keys(prices).map(x => x.toLowerCase()).includes(box.toLowerCase())) return alert("I couldn't find that box!");

    let amount = Math.min(Math.floor(tokens / Object.entries(prices).find(x => x[0].toLowerCase() == box.toLowerCase())[1]), parseInt(`0${prompt("How many boxes do you want to open?")}`));
    if (amount == 0) return alert("You do not have enough tokens!");

    let alertBlooks = confirm("Would you like to alert blooks upon unlocking?");
    let blooks = {};
    let now = Date.now();
    let error = false;

    for (let i = 0; i < amount; i++) {
        await axios.put("/api/users/unlockblook", { name, box: box.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ') }).then(({ data: { unlockedBlook, tokens, isNewBlook } }) => {
            blooks[unlockedBlook] ||= 0;
            blooks[unlockedBlook]++;

            let before = Date.now();

            if (alertBlooks) alert(`${unlockedBlook} (${i + 1}/${amount}) ${isNewBlook ? "NEW! " : ''}${tokens} tokens left`);

            now += Date.now() - before;
        }).catch(e => error = true);
        if (error) break;
    }
    alert(`(${Date.now() - now}ms) Results:\n${Object.entries(blooks).map(([blook, amount]) => `    ${blook} ${amount}`).join(`\n`)}`);
}).catch(() => alert('There was an error user data!'));