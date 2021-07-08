import {echo, exec, exit} from 'shelljs'
import {watch} from 'gulp'

const IMPORT_FILE_PATH = './excels/go-tips.csv'
const EXPORT_FILE_PATH = './out/tips.json'

const importCmd = `mongoimport -d go -c tips --type csv --file ${IMPORT_FILE_PATH} --columnsHaveTypes --headerline --drop --maintainInsertionOrder`;
const exportCmd = `mongoexport -d go -c tips -o ${EXPORT_FILE_PATH} --jsonArray`;

function updateJson() {
    if(exec(importCmd).code!==0){
        echo('Error: 引入表格错误');
        exit(1);
    }
    if(exec(exportCmd).code!==0){
        echo('Error: 导出表格错误');
        exit(1);
    }    
}

watch(IMPORT_FILE_PATH, ()=>{
    updateJson();
})