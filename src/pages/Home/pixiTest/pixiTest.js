import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

const Pixispine = () => {

    useEffect(() => {
        const app = new PIXI.Application({
            width: 600,
            height: 600,
        });

        document.getElementById('pixiSpine').appendChild(app.view);

        app.loader
            .add('TDM', './TDM/TDM.json')
            .load((loader, res) => {
                console.log(res)
                const TDM = new Spine(res.TDM.spineData);

                TDM.scale.set(0.5, 0.5);
                TDM.x = 300;
                TDM.y = 300;

                TDM.state.setAnimation(0, 'breath', true);

                app.stage.addChild(TDM);
            });
    }, []);

    return (
        <div id="pixiSpine" ></div>
    );
};

export default Pixispine;