import { beforeEach, describe, expect, it } from 'vitest';
import { useVisitor } from '@/domain/visitor';
import { SESSION_GOAL, useSession } from './session-store';

const learnMany = (n: number, from = 0) => Array.from({ length: n }, (_, k) => useSession.getState().learn(`thing-${from + k}`));

describe('session goal', () => {
  beforeEach(() => {
    useSession.setState({ learned: [], medals: [], rounds: 0, celebrate: null });
  });

  it('awards a medal at every fifth thing', () => {
    learnMany(4);
    expect(useSession.getState().medals).toEqual([]);
    learnMany(1, 4);
    expect(useSession.getState()).toMatchObject({ medals: [1], celebrate: 1 });
    learnMany(10, 5);
    expect(useSession.getState().medals).toEqual([1, 2, 3]);
  });

  it('counts each thing once', () => {
    expect(useSession.getState().learn('a')).toBe('ok');
    expect(useSession.getState().learn('a')).toBe('already');
    expect(useSession.getState().learned).toEqual(['a']);
  });

  it('starts a new round after twenty and frees those things to be learned again', () => {
    const ids = Array.from({ length: SESSION_GOAL }, (_, k) => `thing-${k}`);
    useVisitor.setState({ learned: Object.fromEntries([...ids, 'kept'].map((id) => [id, 1])) });
    learnMany(SESSION_GOAL);
    expect(useSession.getState().celebrate).toBe(4);
    useSession.getState().dismiss();
    expect(useSession.getState()).toMatchObject({ learned: [], medals: [], rounds: 1, celebrate: null });
    expect(Object.keys(useVisitor.getState().learned)).toEqual(['kept']);
  });
});
