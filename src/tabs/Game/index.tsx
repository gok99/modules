import React from 'react';
import { Links, createRoomPreview } from './constants';

type Props = {
  children?: never;
  className?: string;
  debuggerContext?: any;
};

function Game({ debuggerContext }: Props) {
  React.useEffect(() => {
    if (!debuggerContext.context?.moduleContexts?.game?.state?.renderPreview) {
      return;
    }
    const game = createRoomPreview(debuggerContext.context?.moduleContexts?.game?.state);
  }, []);

  return (
    <div>
      {
        debuggerContext.context?.moduleContexts?.game?.state?.renderPreview
        && (
          <div>
            <h3>Scene Preview (Experimental)</h3>
            <div id="game-display"></div>
            <br />
          </div>)
      }
      Info: You can visit the game or use <code>run_scene</code> to see the effect of your program.
      Remember to save your work first!
      <br />
      <br />
      You may find the game module{' '}
      <a
        href={Links.gameAPIDocumentation}
        rel="noopener noreferrer"
        target="_blank"
      >
        documentation{' '}
      </a>
      and{' '}
      <a href={Links.gameUserGuide} rel="noopener noreferrer" target="_blank">
        user guide{' '}
      </a>
      useful.
    </div>
  );
}

export default {
  toSpawn: () => true,
  body: (debuggerContext: any) => <Game debuggerContext={debuggerContext} />,
  label: 'Game Info Tab',
  iconName: 'info-sign',
};
