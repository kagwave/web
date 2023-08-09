const createKagwaveId = (type?: string): string => {

    let id: number;
    if (!type || type === 'player') {
      id = Math.floor(100000000000000 + Math.random() * 900000000000000);
    }
    return id!.toString();
}

export default createKagwaveId;