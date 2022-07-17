const operanciones = [
    {
        simbolo: '+',
        nro1:[10,999],
        nro2:[10,999],
        ajuste: (a,b) => [a,b]
    },
    {
        simbolo: '-',
        nro1:[10,999],
        nro2:[10,999],
        ajuste: (a,b) => (a>b)?[a,b]:[b,a]
    },
    {
        simbolo: 'x',
        nro1:[1,10],
        nro2:[1,10],
        ajuste: (a,b) => [a,b]
    }];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generanros() {
    var item = operanciones[Math.floor(Math.random()*operanciones.length)];
    nro1=randomIntFromInterval(...item.nro1);
    nro2=randomIntFromInterval(...item.nro2);
    [nro1,nro2]=item.ajuste(nro1,nro2);
    return [nro1,nro2,item.simbolo];
}

function generador(pages=1) {
    if (isNaN(pages)) pages=1;
    console.log(pages);
    var doc = new jspdf.jsPDF({orientation: "portrait",unit: "mm", format:"a4"});
    let widthhpage=doc.internal.pageSize.getWidth()-5

    doc.setFont("Arial","bold");
    doc.setFontSize(35);
    
    for (let page=0; page<pages;page++) {
        let x=35;
        let y=20;
        for (let i=0;i<40;i++) {
            [nro1,nro2,simbolo]=generanros();
            
            doc.text(nro1.toString(), x, y,{'align':'right'});
            doc.text(simbolo+" "+nro2.toString(), x, y+10,{'align':'right'});
            doc.line(x-25,y+12,x+2,y+12)
            x+=40;
            if (x>widthhpage) {
                x=35;
                y+=35;
            }
        }
        doc.addPage()
    }
    doc.deletePage(11)
    doc.save(`mates.pdf`);
}