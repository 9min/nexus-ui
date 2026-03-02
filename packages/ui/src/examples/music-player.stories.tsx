import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { AspectRatio } from '../components/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardContent } from '../components/card';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '../components/menubar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover';
import { Progress } from '../components/progress';
import { ScrollArea } from '../components/scroll-area';
import { Separator } from '../components/separator';
import { Slider } from '../components/slider';
import { Toggle, ToggleGroup, ToggleGroupItem } from '../components/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
}

const NOW_PLAYING: Track = {
  id: '1',
  title: 'Midnight Dreams',
  artist: 'The Nexus Band',
  album: 'Digital Horizons',
  duration: '4:32',
  durationSec: 272,
};

const PLAYLIST: Track[] = [
  { id: '1', title: 'Midnight Dreams', artist: 'The Nexus Band', album: 'Digital Horizons', duration: '4:32', durationSec: 272 },
  { id: '2', title: 'Sunrise Protocol', artist: 'Echo System', album: 'Binary Sunset', duration: '3:45', durationSec: 225 },
  { id: '3', title: 'Neon Waves', artist: 'The Nexus Band', album: 'Digital Horizons', duration: '5:12', durationSec: 312 },
  { id: '4', title: 'Cloud Atlas', artist: 'Pixel Perfect', album: 'Rendered Reality', duration: '3:58', durationSec: 238 },
  { id: '5', title: 'Deep Focus', artist: 'Ambient Logic', album: 'Flow State', duration: '6:20', durationSec: 380 },
  { id: '6', title: 'Circuit Breaker', artist: 'Echo System', album: 'Binary Sunset', duration: '4:15', durationSec: 255 },
  { id: '7', title: 'Data Stream', artist: 'The Nexus Band', album: 'Digital Horizons', duration: '3:33', durationSec: 213 },
  { id: '8', title: 'Quantum Leap', artist: 'Pixel Perfect', album: 'Rendered Reality', duration: '4:48', durationSec: 288 },
  { id: '9', title: 'Infinite Loop', artist: 'Ambient Logic', album: 'Flow State', duration: '7:10', durationSec: 430 },
  { id: '10', title: 'Byte Me', artist: 'Echo System', album: 'Binary Sunset', duration: '3:22', durationSec: 202 },
];

const RECENTLY_PLAYED = PLAYLIST.slice(3, 7);

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function MusicPlayerPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(42);
  const [volume, setVolume] = React.useState([75]);
  const [isShuffled, setIsShuffled] = React.useState(false);
  const [repeatMode, setRepeatMode] = React.useState<'off' | 'all' | 'one'>('off');

  const currentTime = Math.floor((progress / 100) * NOW_PLAYING.durationSec);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  return (
    <TooltipProvider>
      <div className={cn('flex h-screen flex-col bg-background text-foreground')}>
        {/* Menubar */}
        <Menubar className={cn('rounded-none border-b border-border')}>
          <MenubarMenu>
            <MenubarTrigger>Music</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>About Music Player</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Preferences <MenubarShortcut>Ctrl+,</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Quit <MenubarShortcut>Ctrl+Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Import... <MenubarShortcut>Ctrl+I</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Export Playlist...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Create New Playlist</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Now Playing</MenubarItem>
              <MenubarItem>Library</MenubarItem>
              <MenubarItem>Equalizer</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Playback</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Play/Pause <MenubarShortcut>Space</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Next <MenubarShortcut>Ctrl+&#8594;</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Previous <MenubarShortcut>Ctrl+&#8592;</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Shuffle</MenubarItem>
              <MenubarItem>Repeat</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Main Content */}
        <div className={cn('flex flex-1 overflow-hidden')}>
          {/* Sidebar */}
          <aside className={cn('w-64 border-r border-border p-4')}>
            <nav className={cn('space-y-1')} aria-label="Music navigation">
              <Button variant="ghost" className={cn('w-full justify-start')}>&#127925; Now Playing</Button>
              <Button variant="ghost" className={cn('w-full justify-start')}>&#127912; Library</Button>
              <Button variant="ghost" className={cn('w-full justify-start')}>&#9825; Favorites</Button>
            </nav>

            <Separator className={cn('my-4')} />

            <h3 className={cn('mb-2 text-sm font-medium text-muted-foreground')}>Playlists</h3>
            <ScrollArea className={cn('h-[200px]')}>
              <nav className={cn('space-y-1')} aria-label="Playlists">
                {['Digital Horizons', 'Chill Vibes', 'Work Focus', 'Late Night', 'Road Trip'].map((name) => (
                  <Button key={name} variant="ghost" size="sm" className={cn('w-full justify-start text-sm')}>
                    {name}
                  </Button>
                ))}
              </nav>
            </ScrollArea>

            <Separator className={cn('my-4')} />

            <h3 className={cn('mb-2 text-sm font-medium text-muted-foreground')}>Recently Played</h3>
            <div className={cn('space-y-2')}>
              {RECENTLY_PLAYED.map((track) => (
                <div key={track.id} className={cn('flex items-center gap-2')}>
                  <Avatar className={cn('h-8 w-8')}>
                    <AvatarImage alt={track.album} />
                    <AvatarFallback className={cn('text-xs')}>{track.artist[0]}</AvatarFallback>
                  </Avatar>
                  <div className={cn('flex-1 overflow-hidden')}>
                    <p className={cn('truncate text-xs font-medium')}>{track.title}</p>
                    <p className={cn('truncate text-xs text-muted-foreground')}>{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Area */}
          <div className={cn('flex flex-1 flex-col')}>
            {/* Now Playing + Playlist */}
            <div className={cn('flex flex-1 overflow-hidden')}>
              {/* Now Playing */}
              <section className={cn('flex w-80 flex-col items-center border-r border-border p-6')} aria-label="Now playing">
                <Card className={cn('w-full')}>
                  <CardContent className={cn('p-3')}>
                    <AspectRatio ratio={1}>
                      <div className={cn('flex h-full items-center justify-center rounded bg-muted')}>
                        <span className={cn('text-6xl')} aria-hidden="true">&#127925;</span>
                      </div>
                    </AspectRatio>
                  </CardContent>
                </Card>

                <div className={cn('mt-4 text-center')}>
                  <h2 className={cn('text-lg font-bold')}>{NOW_PLAYING.title}</h2>
                  <p className={cn('text-sm text-muted-foreground')}>{NOW_PLAYING.artist}</p>
                  <Badge variant="secondary" className={cn('mt-1')}>{NOW_PLAYING.album}</Badge>
                </div>

                <div className={cn('mt-4 w-full space-y-2')}>
                  <Slider
                    value={[progress]}
                    onValueChange={(v) => setProgress(v[0])}
                    max={100}
                    step={1}
                    aria-label="Playback progress"
                  />
                  <div className={cn('flex justify-between text-xs text-muted-foreground')}>
                    <span>{minutes}:{String(seconds).padStart(2, '0')}</span>
                    <span>{NOW_PLAYING.duration}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className={cn('mt-4 flex items-center gap-2')}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Toggle
                        pressed={isShuffled}
                        onPressedChange={setIsShuffled}
                        size="sm"
                        aria-label="Shuffle"
                      >
                        &#128256;
                      </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Shuffle {isShuffled ? 'On' : 'Off'}</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" aria-label="Previous track">&#9198;</Button>
                    </TooltipTrigger>
                    <TooltipContent>Previous</TooltipContent>
                  </Tooltip>

                  <Button
                    size="lg"
                    className={cn('h-12 w-12 rounded-full')}
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '\u23F8' : '\u25B6'}
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" aria-label="Next track">&#9197;</Button>
                    </TooltipTrigger>
                    <TooltipContent>Next</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Toggle
                        pressed={repeatMode !== 'off'}
                        onPressedChange={() => {
                          setRepeatMode((m) => (m === 'off' ? 'all' : m === 'all' ? 'one' : 'off'));
                        }}
                        size="sm"
                        aria-label={`Repeat: ${repeatMode}`}
                      >
                        {repeatMode === 'one' ? '\uD83D\uDD02' : '\uD83D\uDD01'}
                      </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Repeat: {repeatMode}</TooltipContent>
                  </Tooltip>
                </div>

                {/* Volume */}
                <div className={cn('mt-4 flex w-full items-center gap-2')}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" aria-label="Volume settings">
                        {volume[0] === 0 ? '\uD83D\uDD07' : volume[0] < 50 ? '\uD83D\uDD09' : '\uD83D\uDD0A'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={cn('w-48')}>
                      <div className={cn('space-y-2')}>
                        <p className={cn('text-sm font-medium')}>Volume: {volume[0]}%</p>
                        <Slider
                          value={volume}
                          onValueChange={setVolume}
                          max={100}
                          step={1}
                          aria-label="Volume"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className={cn('flex-1')}
                    aria-label="Volume"
                  />
                </div>
              </section>

              {/* Playlist */}
              <section className={cn('flex-1 overflow-hidden')} aria-label="Playlist">
                <div className={cn('flex items-center justify-between border-b border-border p-4')}>
                  <div>
                    <h2 className={cn('text-lg font-bold')}>Digital Horizons</h2>
                    <p className={cn('text-sm text-muted-foreground')}>
                      {PLAYLIST.length} tracks &middot; 46 min
                    </p>
                  </div>
                  <ToggleGroup type="single" defaultValue="list">
                    <ToggleGroupItem value="list" aria-label="List view" className={cn('text-xs')}>
                      List
                    </ToggleGroupItem>
                    <ToggleGroupItem value="compact" aria-label="Compact view" className={cn('text-xs')}>
                      Compact
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <ScrollArea className={cn('h-[calc(100vh-180px)]')}>
                  <div className={cn('divide-y divide-border')}>
                    {PLAYLIST.map((track, i) => (
                      <div
                        key={track.id}
                        className={cn(
                          'flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent',
                          track.id === NOW_PLAYING.id && 'bg-accent',
                        )}
                      >
                        <span className={cn('w-6 text-right text-sm text-muted-foreground')}>
                          {track.id === NOW_PLAYING.id && isPlaying ? (
                            <span role="img" aria-label="Now playing">&#9654;</span>
                          ) : (
                            i + 1
                          )}
                        </span>
                        <Avatar className={cn('h-10 w-10')}>
                          <AvatarImage alt={track.album} />
                          <AvatarFallback className={cn('text-xs')}>{track.artist[0]}</AvatarFallback>
                        </Avatar>
                        <div className={cn('flex-1')}>
                          <p className={cn('text-sm font-medium', track.id === NOW_PLAYING.id && 'text-primary')}>
                            {track.title}
                          </p>
                          <p className={cn('text-xs text-muted-foreground')}>{track.artist}</p>
                        </div>
                        <span className={cn('text-sm text-muted-foreground')}>{track.album}</span>
                        <span className={cn('w-12 text-right text-sm text-muted-foreground')}>{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </section>
            </div>

            {/* Bottom Progress Bar */}
            <div className={cn('border-t border-border')}>
              <Progress value={progress} className={cn('h-1 rounded-none')} aria-label="Track progress" />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/Music Player',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <MusicPlayerPage />,
};
