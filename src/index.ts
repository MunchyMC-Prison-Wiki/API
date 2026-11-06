import express, { Request, Response } from "express"
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import NBTParser from "./modules/nbtParser.js"

class Main {
    private readonly app = express()
    private readonly port: number = 3000
    private readonly client: MongoClient = new MongoClient(String(process.env.URI))

    private readonly parser: NBTParser = new NBTParser()

    constructor() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send([
                this.parser.parse(`{"id":"minecraft:leather_boots","count":1,"components":{"minecraft:dyed_color":43520,"minecraft:attribute_modifiers":[{"type":"minecraft:sneaking_speed","operation":"add_value","amount":0.45d,"id":"mprison:toph_feet_sneaking_speed","slot":"feet"},{"type":"minecraft:explosion_knockback_resistance","operation":"add_value","amount":1.0d,"id":"mprison:toph_feet_explosion_resistance","slot":"feet"},{"type":"minecraft:armor","operation":"add_value","amount":3.0d,"id":"mprison:prison_armor_toughness_boots","slot":"feet"}],"minecraft:lore":[{"italic":0b,"extra":[{"color":"green","extra":[" "],"bold":1b,"text":"AVATAR EARTH"},{"color":"dark_red","bold":1b,"text":"ULTRA"}],"text":""},{"italic":0b,"extra":["Want to figure out the ability? Buy hints from /thrift"],"text":"","color":"gray"},{"color":"gray","text":"##102 271443 9537371"},"Found By: sometimescrazy",{"color":"gray","text":"Hits: 74"},{"italic":0b,"text":"Hints:","color":"gray"},{"italic":0b,"text":" ⁕ While worn, take 8% less damage and 12% less damage while sneaking","color":"gray"},{"italic":0b,"text":" ⁕ Move faster while sneaking","color":"gray"},{"italic":0b,"text":" ⁕ You have 0.6x knockback reduction to self and full explosion knockback resistance","color":"gray"}],"minecraft:unbreakable":{},"minecraft:custom_name":{"italic":0b,"text":"Toph Feet","bold":1b,"color":"dark_green"},"minecraft:enchantments":{"minecraft:protection":8},"minecraft:custom_data":{"PublicBukkitValues":{"mprison:item_data":{"mprison:item_type":"tophfeet","mprison:hints":[I;2,1,0],"mprison:item_stats":{"mprison:hits":74,"mprison:mined":0,"mprison:kills":0},"mprison:dupeid":{"mprison:unique_id":271443,"mprison:finder_name":"sometimescrazy","mprison:spawn_type":102,"mprison:owner":9537371}}}}}}`),
                this.parser.parse(`{"id":"minecraft:iron_axe","count":1,"components":{"minecraft:lore":[{"italic":0b,"extra":[{"color":"#FF9933","extra":[" "],"bold":1b,"text":"ADVENTURE TIME"},{"color":"yellow","bold":1b,"text":"LEGENDARY"}],"text":""},{"italic":0b,"extra":["Want to figure out the ability? Buy hints from /thrift"],"text":"","color":"gray"},{"color":"gray","text":"##0 137661 53027053"},"Found By: JustinDraggss",{"color":"gray","text":"Hits: 182"},{"italic":0b,"text":"Hints:","color":"gray"},{"italic":0b,"text":" ⁕ Right click to teleport to the nearest player","color":"gray"},{"italic":0b,"text":" ⁕ Gain strength 3 and speed 5 at night","color":"gray"},{"italic":0b,"text":" ⁕ Hit someone for a chance to heal and make them bleed","color":"gray"}],"minecraft:unbreakable":{},"minecraft:custom_name":{"italic":0b,"text":"MARCELINE'S AXE BASS","bold":1b,"color":"black"},"minecraft:enchantments":{"minecraft:sharpness":21,"minecraft:fortune":15,"minecraft:efficiency":1},"minecraft:custom_model_data":{"strings":["marcelines_bass_axe"]},"minecraft:custom_data":{"PublicBukkitValues":{"mprison:item_data":{"mprison:item_type":"marcelinesaxebass","mprison:hints":[I;1,0,2],"mprison:item_stats":{"mprison:hits":182,"mprison:mined":0,"mprison:kills":0},"mprison:dupeid":{"mprison:unique_id":137661,"mprison:finder_name":"JustinDraggss","mprison:spawn_type":0,"mprison:owner":53027053}}}}}}`)
            ])
        })

        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`)
        })
    }

    async connect() {
        await this.client.connect()
    }

    async disconnect() {
        await this.client.close()
    }
}

dotenv.config()
new Main()