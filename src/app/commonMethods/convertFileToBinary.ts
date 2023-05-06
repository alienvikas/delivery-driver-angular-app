export class ConvertFile {
    static FileToByteArray(file: File) {
        let byteFile;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            byteFile = new Uint8Array(arrayBuffer);
        };
        return byteFile;
    }

}