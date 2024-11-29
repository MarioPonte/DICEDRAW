import { type RefObject, memo, useCallback, useEffect, useState } from 'react';
import { Card } from './ui/card';

const saveScreenshotPromise = import('@/utils/saveScreenshot');

interface Props {
  completed: boolean;
  groupsElement: RefObject<HTMLElement | null>;
}

interface State {
  downloadClicked: null | 'png' | 'svg';
  transitionsEnabled: boolean;
}

const getInitialState = (): State => ({
  downloadClicked: null,
  transitionsEnabled: true,
});

function Download({ completed, groupsElement }: Props) {
  const [{ downloadClicked }, setState] =
    useState(getInitialState);

  const setDownloadClicked = useCallback(
    (format: State['downloadClicked']) => setState({ downloadClicked: format, transitionsEnabled: false, }),
    [setState],
  );

  useEffect(() => {
    (async () => {
      if (!downloadClicked) return;
      try {
        const el = groupsElement.current;
        if (!el) throw new Error('groups element is null');
        const mod = await saveScreenshotPromise;
        await mod.default(el, downloadClicked);
      } catch (err) {
        console.error(err);
      }
      setDownloadClicked(null);
    })();
  }, [downloadClicked]);

  useEffect(() => {
    if (!completed) setState({ downloadClicked: null, transitionsEnabled: true, })
  }, [completed]);

  const onDownloadPngClick = useCallback(() => setDownloadClicked('png'), [setDownloadClicked]);
  const onDownloadSvgClick = useCallback(() => setDownloadClicked('svg'), [setDownloadClicked]);

  return completed && !!groupsElement ? (
    <Card className='w-fit p-2'>
      {'Download as '}
      <button type='button' onClick={onDownloadPngClick} className='underline text-neutral-600'>PNG</button>
      {', '}
      <button type='button' onClick={onDownloadSvgClick} className='underline text-neutral-600'>SVG</button>
    </Card>
  ) : null;
}

export default memo(Download);