const state = {
  currentScene: 1,
  completed: {
    tea: false,
    incense: false,
    flower: false,
    painting: false
  },
  scores: {
    tea: 0,
    incense: 0,
    flower: 0,
    painting: 0
  },
  flowerChoice: [],
  foundPaintingItems: [],
  teaArt: {
    dataUrl: "",
    pathLength: 0,
    points: 0
  }
};

const qinghuanResultImages = [
  "assets/scene19/qinghuan-0.jpg",
  "assets/scene19/qinghuan-1.jpg",
  "assets/scene19/qinghuan-2.jpg",
  "assets/scene19/qinghuan-3.jpg"
];

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function isAllChaptersComplete() {
  return Object.values(state.completed).every(Boolean);
}

function updateViewportSize() {
  const viewport = window.visualViewport;
  const width = document.documentElement.clientWidth || window.innerWidth;
  const height = viewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--app-width", `${width}px`);
  document.documentElement.style.setProperty("--app-height", `${height}px`);
}

function initMobileViewport() {
  updateViewportSize();
  window.addEventListener("resize", updateViewportSize, { passive: true });
  window.addEventListener("orientationchange", updateViewportSize, { passive: true });
  window.visualViewport?.addEventListener("resize", updateViewportSize, { passive: true });
}

function getSceneEntranceTargets(sceneNumber, scene) {
  if (sceneNumber === 2) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene2-layer:not(.scene2-tap)")),
      motionOnly: Array.from(scene.querySelectorAll(".scene2-tap"))
    };
  }

  if (sceneNumber === 3) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene3-layer:not(.scene3-swipe-hand)")),
      motionOnly: Array.from(scene.querySelectorAll(".scene3-swipe-hand"))
    };
  }

  if (sceneNumber === 4) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene4-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 5) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene5-layer:not(.scene5-result-button)")),
      motionOnly: []
    };
  }

  if (sceneNumber === 6) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene6-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 7) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene7-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 8) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene8-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 9) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene9-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 10) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene10-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 11) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene11-layer:not(.scene11-result-button)")),
      motionOnly: []
    };
  }

  if (sceneNumber === 12) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene12-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 13) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene13-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 14) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene14-layer:not(.scene14-start)")),
      motionOnly: []
    };
  }

  if (sceneNumber === 15) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene15-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 16) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene16-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 17) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene17-layer")),
      motionOnly: []
    };
  }

  if (sceneNumber === 18) {
    return {
      layers: Array.from(scene.querySelectorAll(".scene18-layer")),
      motionOnly: []
    };
  }

  return { layers: [], motionOnly: [] };
}

function prepareSceneEntrance(sceneNumber, scene) {
  if (!window.gsap || document.body.classList.contains("static-check")) return;
  const { layers } = getSceneEntranceTargets(sceneNumber, scene);
  if (!layers.length) return;

  gsap.killTweensOf(layers);
  if (sceneNumber === 11) {
    const centeredLayers = Array.from(scene.querySelectorAll(".scene11-title, .scene11-divider"));
    const otherLayers = layers.filter((layer) => !centeredLayers.includes(layer));
    gsap.set(centeredLayers, { autoAlpha: 0, y: 16 });
    gsap.set(otherLayers, { autoAlpha: 0, y: 16 });
    return;
  }
  if (sceneNumber === 10) {
    gsap.set(layers, { autoAlpha: 0, y: 14 });
    return;
  }

  gsap.set(layers, { autoAlpha: 0, y: 16 });
}

function buildScene10EntranceTimeline(scene, { paused = false } = {}) {
  const layers = Array.from(scene.querySelectorAll(".scene10-layer"));
  const title = scene.querySelector(".scene10-title-art");
  const seal = scene.querySelector(".scene10-seal");
  const divider = scene.querySelector(".scene10-divider");
  const copy = scene.querySelector(".scene10-copy");
  const table = scene.querySelector(".scene10-table-wrap");
  const vase = scene.querySelector(".scene10-vase-wrap");
  const plum = scene.querySelector(".scene10-branch-plum");
  const bamboo = scene.querySelector(".scene10-branch-bamboo");
  const chrys = scene.querySelector(".scene10-branch-chrys");
  const plumTag = scene.querySelector(".scene10-tag-plum");
  const start = scene.querySelector(".scene10-start");
  const prompt = scene.querySelector(".scene10-prompt");

  gsap.killTweensOf(layers);
  gsap.set(layers, { autoAlpha: 0, y: 14, scale: 1, transformOrigin: "50% 50%" });
  if (table) gsap.set(table, { y: 18 });
  if (vase) gsap.set(vase, { y: 18 });
  if (plum) gsap.set(plum, { y: 18 });
  if (bamboo) gsap.set(bamboo, { y: 18 });
  if (chrys) gsap.set(chrys, { y: 18 });
  if (start) gsap.set(start, { y: 16, scale: 0.98 });

  if (reduceMotionQuery.matches) {
    gsap.set(layers, { autoAlpha: 1, y: 0, scale: 1, clearProps: "visibility,transform" });
    return gsap.timeline({ paused });
  }

  const timeline = gsap.timeline({
    paused,
    defaults: { ease: "power2.out" },
    onComplete: () => {
      gsap.set(layers, { clearProps: "visibility" });
    }
  });

  timeline
    .to(title, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.06)
    .to(seal, { autoAlpha: 1, y: 0, duration: 0.58 }, 0.18)
    .to(divider, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.32)
    .to(copy, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.48)
    .to(table, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.78)
    .to(vase, { autoAlpha: 1, y: 0, duration: 0.78 }, 0.92)
    .to(plum, { autoAlpha: 1, y: 0, duration: 0.72 }, 1.08)
    .to(bamboo, { autoAlpha: 1, y: 0, duration: 0.72 }, 1.2)
    .to(chrys, { autoAlpha: 1, y: 0, duration: 0.72 }, 1.32)
    .to(plumTag, { autoAlpha: 1, y: 0, duration: 0.48 }, 1.42)
    .to(start, { autoAlpha: 1, y: 0, scale: 1, duration: 0.64 }, 1.52)
    .to(prompt, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.72);

  return timeline;
}

function buildScene9EntranceTimeline(scene, { paused = false } = {}) {
  const layers = Array.from(scene.querySelectorAll(".scene9-layer"));
  const topGroup = [
    scene.querySelector(".scene9-title"),
    scene.querySelector(".scene9-vertical-seal"),
    scene.querySelector(".scene9-divider"),
    scene.querySelector(".scene9-subtitle")
  ].filter(Boolean);
  const burner = scene.querySelector(".scene9-burner");
  const smoke = scene.querySelector(".scene9-smoke-field");
  const copy = scene.querySelector(".scene9-copy");
  const seal = scene.querySelector(".scene9-seal-crop");
  const gainText = scene.querySelector(".scene9-gain-text");
  const back = scene.querySelector(".scene9-back");

  gsap.killTweensOf(layers);
  gsap.set(layers, { autoAlpha: 0, y: 18, scale: 1, transformOrigin: "50% 50%" });
  gsap.set(topGroup, { y: 10 });
  if (burner) gsap.set(burner, { y: 28, scale: 0.985, transformOrigin: "50% 66%" });
  if (smoke) gsap.set(smoke, { y: 22, scale: 0.92, transformOrigin: "50% 100%" });
  if (copy) gsap.set(copy, { y: 18 });
  if (seal) gsap.set(seal, { y: 18, scale: 0.92, transformOrigin: "50% 50%" });
  if (gainText) gsap.set(gainText, { y: 12 });
  if (back) gsap.set(back, { y: 16 });

  if (reduceMotionQuery.matches) {
    gsap.set(layers, { autoAlpha: 1, y: 0, scale: 1, clearProps: "visibility,transform" });
    return gsap.timeline({ paused });
  }

  const timeline = gsap.timeline({
    paused,
    defaults: { ease: "power2.out" },
    onComplete: () => {
      gsap.set([topGroup, copy, seal, gainText, back].flat().filter(Boolean), {
        clearProps: "transform"
      });
    }
  });

  if (topGroup.length) {
    timeline.to(topGroup, {
      autoAlpha: 1,
      y: 0,
      duration: 0.62,
      stagger: 0.1,
      clearProps: "visibility"
    }, 0.08);
  }

  if (burner) {
    timeline.to(burner, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.82,
      clearProps: "visibility"
    }, 0.48);
  }

  if (smoke) {
    timeline.to(smoke, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.05,
      ease: "sine.out",
      clearProps: "visibility"
    }, 0.84);
  }

  if (copy) {
    timeline.to(copy, {
      autoAlpha: 1,
      y: 0,
      duration: 0.62,
      clearProps: "visibility"
    }, 1.1);
  }

  if (seal) {
    timeline.to(seal, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.58,
      ease: "back.out(1.4)",
      clearProps: "visibility"
    }, 1.3);
  }

  if (gainText) {
    timeline.to(gainText, {
      autoAlpha: 1,
      y: 0,
      duration: 0.48,
      clearProps: "visibility"
    }, 1.48);
  }

  if (back) {
    timeline.to(back, {
      autoAlpha: 1,
      y: 0,
      duration: 0.58,
      clearProps: "visibility"
    }, 1.66);
  }

  return timeline;
}

function buildScene17EntranceTimeline(scene, { paused = false } = {}) {
  const layers = Array.from(scene.querySelectorAll(".scene17-layer"));
  const title = scene.querySelector(".scene17-title");
  const seal = scene.querySelector(".scene17-seal");
  const divider = scene.querySelector(".scene17-divider");
  const copy = scene.querySelector(".scene17-copy");
  const stamp = scene.querySelector(".scene17-tea-stamp");
  const gainText = scene.querySelector(".scene17-gain-text");
  const back = scene.querySelector(".scene17-back");

  gsap.killTweensOf(layers);
  gsap.set(layers, { autoAlpha: 0, y: 18, scale: 1, transformOrigin: "50% 50%" });
  if (stamp) gsap.set(stamp, { y: 22, scale: 0.86, rotate: -2 });
  if (back) gsap.set(back, { y: 18, scale: 0.98 });

  if (reduceMotionQuery.matches) {
    gsap.set(layers, { autoAlpha: 1, y: 0, scale: 1, rotate: 0, clearProps: "visibility,transform" });
    return gsap.timeline({ paused });
  }

  const timeline = gsap.timeline({
    paused,
    defaults: { ease: "power2.out" },
    onComplete: () => {
      gsap.set(layers, { clearProps: "visibility" });
    }
  });

  timeline
    .to(title, { autoAlpha: 1, y: 0, duration: 0.68 }, 0.08)
    .to(seal, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.18)
    .to(divider, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.34)
    .to(copy, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.5)
    .to(stamp, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.66,
      ease: "back.out(1.35)"
    }, 0.98)
    .to(gainText, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5
    }, 1.1)
    .to(back, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.58
    }, 1.26);

  return timeline;
}

function playSceneEntrance(sceneNumber, scene = document.querySelector(`#scene-${sceneNumber}`)) {
  if (!scene || !window.gsap || document.body.classList.contains("static-check")) return;
  const { layers } = getSceneEntranceTargets(sceneNumber, scene);
  if (!layers.length) return;

  gsap.killTweensOf(layers);

  if (sceneNumber === 11) {
    const centeredLayers = Array.from(scene.querySelectorAll(".scene11-title, .scene11-divider"));
    const otherLayers = layers.filter((layer) => !centeredLayers.includes(layer));

    if (reduceMotionQuery.matches) {
      gsap.set(centeredLayers, { autoAlpha: 1, y: 0, clearProps: "visibility" });
      gsap.set(otherLayers, { autoAlpha: 1, y: 0, clearProps: "visibility" });
      return;
    }

    const timeline = gsap.timeline();
    timeline
      .fromTo(
        centeredLayers,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          clearProps: "visibility"
        },
        0
      )
      .fromTo(
        otherLayers,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          clearProps: "visibility"
        },
        0.18
      );
    return;
  }

  if (reduceMotionQuery.matches) {
    gsap.set(layers, { autoAlpha: 1, y: 0, clearProps: "visibility" });
    return;
  }

  if (sceneNumber === 9) {
    buildScene9EntranceTimeline(scene).play(0);
    return;
  }

  if (sceneNumber === 10) {
    buildScene10EntranceTimeline(scene).play(0);
    return;
  }

  if (sceneNumber === 17) {
    buildScene17EntranceTimeline(scene).play(0);
    return;
  }

  gsap.fromTo(
    layers,
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      stagger: 0.08,
      clearProps: "visibility"
    }
  );
}

function refreshScene3Carousel(animate = false) {
  if (typeof window.renderScene3Carousel === "function") {
    window.renderScene3Carousel(animate);
  }
}

function showScene(sceneNumber) {
  const current = document.querySelector(".scene.active");
  const next = document.querySelector(`#scene-${sceneNumber}`);

  if (!next || current === next) return;

  state.currentScene = sceneNumber;
  if (sceneNumber === 3) {
    updateChapterCards();
  }
  if (sceneNumber === 16) {
    window.renderScene16TeaArt?.();
  }

  if (window.gsap) {
    if (sceneNumber === 9) {
      const layers = Array.from(next.querySelectorAll(".scene9-layer"));

      gsap.killTweensOf([current, next, ...layers]);
      next.classList.add("active");
      gsap.set(current, { zIndex: 2 });
      gsap.set(next, { autoAlpha: 1, y: 0, zIndex: 4 });
      const scene9Timeline = buildScene9EntranceTimeline(next, { paused: true });
      const scene9Hold = { progress: 0 };

      gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          current.classList.remove("active");
          current.style.removeProperty("visibility");
          current.style.removeProperty("opacity");
          current.style.removeProperty("z-index");
          next.style.removeProperty("visibility");
          next.style.removeProperty("opacity");
          next.style.removeProperty("z-index");
        }
      })
        .to(current, { autoAlpha: 0, duration: 0.48, ease: "power1.out" }, 0)
        .call(() => scene9Timeline.play(0), [], 0.08)
        .to(scene9Hold, { progress: 1, duration: 2.3, ease: "none" }, 0.08);
      return;
    }

    if (sceneNumber === 10) {
      const layers = Array.from(next.querySelectorAll(".scene10-layer"));

      gsap.killTweensOf([current, next, ...layers]);
      next.classList.add("active");
      gsap.set(current, { zIndex: 2 });
      gsap.set(next, { autoAlpha: 0, y: 0, zIndex: 4 });
      const scene10Timeline = buildScene10EntranceTimeline(next, { paused: true });
      const scene10Hold = { progress: 0 };

      gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          current.classList.remove("active");
          current.style.removeProperty("visibility");
          current.style.removeProperty("opacity");
          current.style.removeProperty("z-index");
          next.style.removeProperty("visibility");
          next.style.removeProperty("opacity");
          next.style.removeProperty("z-index");
        }
      })
        .to(current, { autoAlpha: 0, y: -18, duration: 0.5 }, 0)
        .to(next, { autoAlpha: 1, y: 0, duration: 0.56 }, 0.08)
        .call(() => scene10Timeline.play(0), [], 0.28)
        .to(scene10Hold, { progress: 1, duration: 2.4, ease: "none" }, 0.28);
      return;
    }

    prepareSceneEntrance(sceneNumber, next);
    next.classList.add("active");
    if (sceneNumber === 3) {
      requestAnimationFrame(() => refreshScene3Carousel(false));
    }
    gsap.set(next, { autoAlpha: 0, zIndex: 3 });
    gsap.set(current, { zIndex: 2 });
    gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        current.classList.remove("active");
        current.style.removeProperty("visibility");
        current.style.removeProperty("opacity");
        current.style.removeProperty("z-index");
        next.style.removeProperty("visibility");
        next.style.removeProperty("opacity");
        next.style.removeProperty("z-index");
        if (sceneNumber === 3) {
          refreshScene3Carousel(false);
        }
        if (sceneNumber !== 10) {
          playSceneEntrance(sceneNumber, next);
        }
      }
    })
      .to(current, { autoAlpha: 0, y: sceneNumber === 9 ? -8 : -18, duration: sceneNumber === 9 ? 0.62 : 0.5 }, 0)
      .fromTo(
        next,
        { autoAlpha: 0, y: sceneNumber === 9 ? 0 : 22 },
        { autoAlpha: 1, y: 0, duration: sceneNumber === 9 ? 1.02 : 0.68 },
        sceneNumber === 9 ? 0.02 : 0.08
      );
    return;
  }

  current.classList.remove("active");
  next.classList.add("active");
  if (sceneNumber === 3) {
    refreshScene3Carousel(false);
  }
  playSceneEntrance(sceneNumber, next);
}

function updateChapterCards() {
  document.querySelectorAll(".scene3-card").forEach((card) => {
    const type = card.dataset.type;
    card.classList.toggle("is-completed", Boolean(state.completed[type]));
  });

  document.querySelectorAll(".scene3-seal").forEach((seal) => {
    const type = seal.dataset.type;
    seal.classList.toggle("is-completed", Boolean(state.completed[type]));
  });

  const allComplete = isAllChaptersComplete();
  const scene = document.querySelector(".scene-3");
  const qinghuanButton = document.querySelector(".scene3-qinghuan");
  scene?.classList.toggle("is-all-complete", allComplete);
  if (qinghuanButton) {
    qinghuanButton.disabled = !allComplete;
  }
}

function completeChapter(type) {
  if (state.completed[type] !== undefined) {
    state.completed[type] = true;
    updateChapterCards();
  }
}

function resetGame() {
  state.currentScene = 1;
  Object.keys(state.completed).forEach((key) => {
    state.completed[key] = false;
  });
  Object.keys(state.scores).forEach((key) => {
    state.scores[key] = 0;
  });
  state.flowerChoice = [];
  state.foundPaintingItems = [];
  state.teaArt = {
    dataUrl: "",
    pathLength: 0,
    points: 0
  };
  updateChapterCards();
  showScene(1);
}

function initTeaInteraction() {}
function initIncenseInteraction() {
  const scene = document.querySelector(".scene-8");
  const hotspot = document.querySelector(".scene8-incense-hotspot");
  const smokeField = document.querySelector(".scene8-smoke-field");
  const smokePaths = Array.from(document.querySelectorAll(".scene8-smoke-lines path"));
  const progressFill = document.querySelector(".scene8-progress-fill");
  const progressText = document.querySelector(".scene8-progress-readout strong");
  const title = document.querySelector(".scene8-title");
  const resultButton = document.querySelector(".scene8-result-button");
  if (!scene || !hotspot || !smokeField || !progressFill || !progressText || !title || !resultButton) return;

  const holdDuration = 5100;
  let progress = state.scores.incense || 0;
  let holdStart = 0;
  let rafId = 0;
  let isHolding = false;
  let isComplete = progress >= 100;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  smokePaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  function renderIncenseProgress(value) {
    progress = clamp(value, 0, 100);
    state.scores.incense = progress;
    const p = progress / 100;
    const easedSmoke = p * p * (3 - 2 * p);

    smokeField.style.setProperty("--scene8-p", easedSmoke.toFixed(4));
    smokeField.style.setProperty("--scene8-smoke-opacity", String(clamp(easedSmoke * 1.75, 0, 1)));
    progressFill.style.width = `${progress}%`;
    progressFill.classList.toggle("is-full", progress >= 99.5);
    progressText.textContent = `${Math.round(progress)}%`;

    smokePaths.forEach((path, index) => {
      const length = Number(path.style.strokeDasharray) || path.getTotalLength();
      const delay = index * 0.06;
      const reveal = clamp((easedSmoke - delay) / (1 - delay), 0, 1);
      path.style.strokeDashoffset = `${length * (1 - reveal)}`;
    });

    title.textContent = progress >= 100
      ? "一炉香起，心境渐安"
      : progress > 28
        ? "保持长按，让烟气绵延"
        : "长按香头，待烟气升起";

    scene.classList.toggle("is-complete", progress >= 100);
    resultButton.disabled = progress < 100;
    resultButton.classList.toggle("is-ready", progress >= 100);
  }

  function finishIncense() {
    isComplete = true;
    isHolding = false;
    scene.classList.remove("is-holding");
    cancelAnimationFrame(rafId);
    renderIncenseProgress(100);
    completeChapter("incense");
  }

  function tick(now) {
    if (!isHolding || isComplete) return;
    const elapsed = now - holdStart;
    const nextProgress = progress + (elapsed / holdDuration) * 100;
    holdStart = now;

    if (nextProgress >= 100) {
      finishIncense();
      return;
    }

    renderIncenseProgress(nextProgress);
    rafId = requestAnimationFrame(tick);
  }

  function startHold(event) {
    if (isComplete) return;
    event.preventDefault();
    isHolding = true;
    holdStart = performance.now();
    scene.classList.add("is-holding");
    scene.classList.remove("is-complete");
    if (event.pointerId !== undefined) {
      hotspot.setPointerCapture?.(event.pointerId);
    }
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function pauseHold() {
    if (isComplete) return;
    isHolding = false;
    scene.classList.remove("is-holding");
    cancelAnimationFrame(rafId);
    renderIncenseProgress(progress);
  }

  if ("PointerEvent" in window) {
    hotspot.addEventListener("pointerdown", startHold);
    hotspot.addEventListener("pointerup", pauseHold);
    hotspot.addEventListener("pointercancel", pauseHold);
    hotspot.addEventListener("lostpointercapture", pauseHold);
  } else {
    hotspot.addEventListener("mousedown", startHold);
    window.addEventListener("mouseup", pauseHold);
    hotspot.addEventListener("touchstart", startHold, { passive: false });
    window.addEventListener("touchend", pauseHold);
    window.addEventListener("touchcancel", pauseHold);
  }

  hotspot.addEventListener("contextmenu", (event) => event.preventDefault());

  resultButton.addEventListener("click", () => {
    if (progress < 100) return;
    if (document.querySelector("#scene-9")) {
      completeChapter("incense");
      showScene(9);
      return;
    }
    completeChapter("incense");
    showScene(3);
  });

  const debugProgress = Number(new URLSearchParams(window.location.search).get("progress"));
  if (Number.isFinite(debugProgress) && debugProgress > 0) {
    renderIncenseProgress(debugProgress);
    if (debugProgress >= 100) {
      isComplete = true;
      resultButton.disabled = false;
      resultButton.classList.add("is-ready");
    }
  } else {
    renderIncenseProgress(progress);
  }
}
function initFlowerInteraction() {}
function initPaintingInteraction() {
  initScene14();
}

function initScene9() {
  const scene = document.querySelector(".scene-9");
  const backButton = document.querySelector(".scene9-back");
  if (!scene || !backButton) return;

  backButton.addEventListener("click", () => {
    completeChapter("incense");
    showScene(3);
  });
}

function getFinalType() {
  const tea = state.scores.tea;
  const incense = state.scores.incense;
  const flowerCount = state.flowerChoice.length;
  const paintingCount = state.foundPaintingItems.length;

  if (incense >= tea && paintingCount >= 3) return "\u6e05\u96c5\u578b";
  if (flowerCount >= 3 && tea >= 80) return "\u96c5\u6b63\u578b";
  if (tea >= 100) return "\u7075\u52a8\u578b";
  return "\u95f2\u9002\u578b";
}

function renderFinalCard() {}

function initHomeScene() {
  const enterButton = document.querySelector(".home-enter");
  if (!enterButton) return;

  enterButton.addEventListener("pointerdown", () => {
    enterButton.classList.add("is-pressed");
  });

  const clearPress = () => enterButton.classList.remove("is-pressed");
  enterButton.addEventListener("pointerup", clearPress);
  enterButton.addEventListener("pointercancel", clearPress);
  enterButton.addEventListener("pointerleave", clearPress);

  enterButton.addEventListener("click", () => {
    if (window.gsap) {
      gsap.fromTo(
        enterButton,
        { scale: 0.985 },
        {
          scale: 1.02,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          onComplete: () => showScene(2)
        }
      );
      return;
    }
    showScene(2);
  });
}

const ritualContent = {
  tea: {
    title: "\u70b9\u8336",
    text: "\u4ee5\u8336\u7b45\u51fb\u62c2\uff0c\u89c2\u6c64\u82b1\u5982\u96ea\u3002"
  },
  incense: {
    title: "\u711a\u9999",
    text: "\u4e00\u7f15\u70df\u8d77\uff0c\u5ba4\u9759\u5fc3\u5b89\u3002"
  },
  flower: {
    title: "\u63d2\u82b1",
    text: "\u4e00\u679d\u5165\u74f6\uff0c\u89c1\u56db\u65f6\u98ce\u7269\u3002"
  },
  painting: {
    title: "\u6302\u753b",
    text: "\u5c55\u5377\u89c2\u5c71\u6c34\uff0c\u501f\u753b\u517b\u5fc3\u3002"
  }
};

function initScene2() {
  const startButton = document.querySelector(".scene2-start");
  const ritualCards = Array.from(document.querySelectorAll(".ritual-card"));
  const note = document.querySelector(".scene2-note");
  const noteTitle = document.querySelector(".scene2-note-title");
  const noteText = document.querySelector(".scene2-note-text");

  const selectRitual = (card) => {
    const type = card.dataset.ritual;
    const content = ritualContent[type];
    if (!content) return;

    ritualCards.forEach((item) => item.classList.toggle("is-selected", item === card));
    noteTitle.textContent = content.title;
    noteText.textContent = content.text;
    note.classList.add("is-visible");

    if (window.gsap) {
      gsap.killTweensOf([card, note]);
      gsap.fromTo(
        card,
        { scale: 0.985 },
        { scale: 1, duration: 0.28, ease: "power2.out", clearProps: "scale" }
      );
      gsap.fromTo(
        note,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }
  };

  ritualCards.forEach((card) => {
    card.addEventListener("click", () => selectRitual(card));
    card.addEventListener("pointerenter", () => selectRitual(card));
    card.addEventListener("focus", () => selectRitual(card));
  });

  const initialRitual = new URLSearchParams(window.location.search).get("ritual");
  const initialCard = ritualCards.find((card) => card.dataset.ritual === initialRitual);
  if (initialCard) {
    requestAnimationFrame(() => selectRitual(initialCard));
  }

  if (!startButton) return;

  startButton.addEventListener("pointerdown", () => {
    startButton.classList.add("is-pressed");
  });

  const clearPress = () => startButton.classList.remove("is-pressed");
  startButton.addEventListener("pointerup", clearPress);
  startButton.addEventListener("pointercancel", clearPress);
  startButton.addEventListener("pointerleave", clearPress);

  startButton.addEventListener("click", () => {
    if (window.gsap) {
      const startArt = startButton.querySelector("img") || startButton;
      gsap.fromTo(
        startArt,
        { scale: 0.985 },
        {
          scale: 1.02,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          clearProps: "scale",
          onComplete: () => showScene(3)
        }
      );
      return;
    }
    showScene(3);
  });
}

function initScene3() {
  const carousel = document.querySelector(".scene3-carousel");
  const cards = Array.from(document.querySelectorAll(".scene3-card"));
  const dots = Array.from(document.querySelectorAll(".scene3-dot"));
  const seals = Array.from(document.querySelectorAll(".scene3-seal"));
  const actions = Array.from(document.querySelectorAll(".scene3-card-action"));
  const qinghuanButton = document.querySelector(".scene3-qinghuan");
  if (!carousel || cards.length === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let lastX = 0;
  let isPointerDown = false;
  let didDrag = false;
  const carouselOrder = [1, 0, 2, 3];

  const wrapIndex = (index) => (index + cards.length) % cards.length;
  const getOrderPosition = (index) => carouselOrder.indexOf(index);

  const renderCarousel = (animate = true) => {
    const shellWidth = carousel.getBoundingClientRect().width || 853;
    const sceneScale = shellWidth / 853;
    const currentPosition = getOrderPosition(currentIndex);
    const slots = [
      { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 14 },
      { x: 410, y: 88, scale: 0.84, rotation: -3.5, opacity: 0.82, zIndex: 9 },
      { x: 615, y: 98, scale: 0.76, rotation: -5.5, opacity: 0.48, zIndex: 5 },
      { x: -410, y: 88, scale: 0.84, rotation: 3.5, opacity: 0.82, zIndex: 9 }
    ];

    if (window.gsap) {
      gsap.killTweensOf(cards);
    }

    cards.forEach((card, index) => {
      const orderPosition = getOrderPosition(index);
      const slotIndex = (orderPosition - currentPosition + cards.length) % cards.length;
      const slot = slots[slotIndex];
      const isActive = slotIndex === 0;
      card.classList.toggle("is-active", isActive);
      card.style.zIndex = String(slot.zIndex);
      card.style.opacity = String(slot.opacity);
      card.style.transition = animate ? "transform 460ms ease, opacity 300ms ease" : "none";
      card.style.transform = `translate3d(calc(-50% + ${slot.x * sceneScale}px), ${slot.y * sceneScale}px, 0) scale(${slot.scale}) rotate(${slot.rotation}deg)`;
    });

    dots.forEach((dot, index) => dot.classList.toggle("is-active", index === currentIndex));
    seals.forEach((seal, index) => seal.classList.toggle("is-active", index === currentIndex));
  };

  const setCurrent = (index, animate = true) => {
    currentIndex = wrapIndex(index);
    renderCarousel(animate);
  };

  const moveByVisualOffset = (offset) => {
    const currentPosition = carouselOrder.indexOf(currentIndex);
    const nextPosition = wrapIndex(currentPosition + offset);
    setCurrent(carouselOrder[nextPosition]);
  };

  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".scene3-card-action")) return;
    isPointerDown = true;
    didDrag = false;
    startX = event.clientX;
    lastX = event.clientX;
    carousel.setPointerCapture?.(event.pointerId);
  });

  carousel.addEventListener("pointermove", (event) => {
    if (!isPointerDown) return;
    lastX = event.clientX;
    if (Math.abs(lastX - startX) > 8) {
      didDrag = true;
      event.preventDefault();
    }
  });

  carousel.addEventListener("pointerup", (event) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    const deltaX = lastX - startX;
    if (Math.abs(deltaX) > 42) {
      didDrag = true;
      moveByVisualOffset(deltaX < 0 ? 1 : -1);
    } else {
      didDrag = false;
    }
    carousel.releasePointerCapture?.(event.pointerId);
  });

  carousel.addEventListener("pointercancel", () => {
    isPointerDown = false;
    didDrag = false;
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (didDrag) {
        didDrag = false;
        return;
      }
      const index = Number(card.dataset.index);
      if (Number.isFinite(index) && index !== currentIndex) {
        setCurrent(index);
      }
    });
  });

  seals.forEach((seal) => {
    seal.addEventListener("click", () => {
      const index = Number(seal.dataset.index);
      if (Number.isFinite(index)) setCurrent(index);
    });
  });

  actions.forEach((action) => {
    action.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      action.classList.add("is-pressed");
    });
    const clearPress = () => action.classList.remove("is-pressed");
    action.addEventListener("pointerup", clearPress);
    action.addEventListener("pointercancel", clearPress);
    action.addEventListener("pointerleave", clearPress);
    action.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetScene = Number(action.dataset.targetScene);
      const target = document.querySelector(`#scene-${targetScene}`);
      if (target) {
        showScene(targetScene);
        return;
      }
      if (window.gsap) {
        const art = action.querySelector("img") || action;
        gsap.fromTo(
          art,
          { scale: 0.96 },
          { scale: 1, duration: 0.2, ease: "power1.out", clearProps: "scale" }
        );
      }
    });
  });

  qinghuanButton?.addEventListener("click", () => {
    if (!isAllChaptersComplete()) return;

    const resultImage = document.querySelector(".scene19-result");
    const randomIndex = Math.floor(Math.random() * qinghuanResultImages.length);
    if (resultImage) {
      resultImage.src = qinghuanResultImages[randomIndex];
    }
    showScene(19);
  });

  window.addEventListener("resize", () => renderCarousel(false), { passive: true });
  window.addEventListener("orientationchange", () => renderCarousel(false), { passive: true });
  window.renderScene3Carousel = renderCarousel;

  cards.forEach((card) => {
    const image = card.querySelector(".scene3-card-art");
    image?.addEventListener("load", () => renderCarousel(false), { once: true });
  });

  renderCarousel(false);
}

async function downloadQinghuanImage() {
  const image = document.querySelector(".scene19-result");
  if (!image?.getAttribute("src")) return;

  const imageUrl = new URL(image.getAttribute("src"), window.location.href);
  const downloadName = `qinghuan-sign-${Date.now()}.jpg`;
  const link = document.createElement("a");
  link.download = downloadName;
  link.rel = "noopener";

  try {
    const response = await fetch(imageUrl.href);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    return;
  } catch (error) {
    link.href = imageUrl.href;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function initScene19() {
  const retryButton = document.querySelector(".scene19-retry");
  const saveButton = document.querySelector(".scene19-save");

  retryButton?.addEventListener("click", () => {
    resetGame();
  });

  saveButton?.addEventListener("click", () => {
    downloadQinghuanImage();
  });
}

function initScene4() {
  const startButton = document.querySelector(".scene4-start");
  if (!startButton) return;

  startButton.addEventListener("pointerdown", () => {
    startButton.classList.add("is-pressed");
  });

  const clearPress = () => startButton.classList.remove("is-pressed");
  startButton.addEventListener("pointerup", clearPress);
  startButton.addEventListener("pointercancel", clearPress);
  startButton.addEventListener("pointerleave", clearPress);

  startButton.addEventListener("click", () => {
    const goNext = () => {
      if (document.querySelector("#scene-5")) {
        showScene(5);
      }
    };

    if (window.gsap) {
      const art = startButton.querySelector("img") || startButton;
      gsap.fromTo(
        art,
        { scale: 0.985 },
        {
          scale: 1.02,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          clearProps: "scale",
          onComplete: goNext
        }
      );
      return;
    }

    goNext();
  });
}

function initScene5() {
  const scene = document.querySelector(".scene-5");
  const cupZone = document.querySelector(".scene5-cup-zone");
  const cups = {
    zero: document.querySelector(".scene5-cup-0"),
    half: document.querySelector(".scene5-cup-50"),
    full: document.querySelector(".scene5-cup-100")
  };
  const hitArea = document.querySelector(".scene5-cup-hit");
  const finishGlow = document.querySelector(".scene5-finish-glow");
  const progressFill = document.querySelector(".scene5-progress-fill");
  const progressText = document.querySelector(".scene5-progress-readout strong");
  const title = document.querySelector(".scene5-title");
  const resultButton = document.querySelector(".scene5-result-button");
  if (!scene || !cupZone || !cups.zero || !cups.half || !cups.full || !hitArea || !finishGlow || !progressFill || !progressText || !title) return;

  const teaParam = Number(new URLSearchParams(window.location.search).get("tea"));
  const completeAngle = Math.PI * 18;
  let progress = Number.isFinite(teaParam) ? Math.max(0, Math.min(100, teaParam)) : (state.scores.tea || 0);
  let accumulatedAngle = (progress / 100) * completeAngle;
  let isPointerDown = false;
  let lastAngle = 0;
  let settleTimer = 0;
  const blendRange = 14;

  const setTitleLines = (lines) => {
    title.replaceChildren();
    lines.forEach((line) => {
      const span = document.createElement("span");
      span.textContent = line;
      title.appendChild(span);
    });
  };

  const getPointerAngle = (event) => {
    const rect = hitArea.getBoundingClientRect();
    return Math.atan2(
      event.clientY - (rect.top + rect.height / 2),
      event.clientX - (rect.left + rect.width / 2)
    );
  };

  const renderTeaProgress = () => {
    const clamped = Math.max(0, Math.min(100, Math.round(progress)));
    const precise = Math.max(0, Math.min(100, progress));
    const firstBlend = Math.max(0, Math.min(1, precise / 50));
    const secondBlend = Math.max(0, Math.min(1, (precise - (100 - blendRange)) / blendRange));
    const zeroAlpha = 1 - firstBlend;
    const halfAlpha = precise < 50 ? firstBlend : precise < 100 - blendRange ? 1 : 1 - secondBlend;
    const fullAlpha = secondBlend;

    state.scores.tea = clamped;
    hitArea.setAttribute("aria-valuenow", String(clamped));
    progressText.textContent = `${clamped}%`;
    progressText.style.visibility = clamped <= 0 ? "hidden" : "visible";
    progressFill.style.width = `${clamped}%`;

    if (clamped >= 100) {
      setTitleLines(["汤花已成，雪乳初现"]);
    } else {
      setTitleLines(["在茶汤上快速滑动，", "击拂出汤花"]);
    }

    cups.zero.style.opacity = String(zeroAlpha);
    cups.zero.style.transform = `scale(${1 - firstBlend * 0.012})`;
    cups.half.style.opacity = String(halfAlpha);
    cups.half.style.transform = `scale(${0.995 + Math.min(precise, 60) / 6000}) rotate(${precise * 0.3}deg)`;
    cups.full.style.opacity = String(fullAlpha);
    cups.full.style.transform = `scale(${0.99 + fullAlpha * 0.018}) rotate(${precise * 0.08}deg)`;
    finishGlow.style.opacity = String(fullAlpha);
    finishGlow.style.transform = `scale(${0.86 + fullAlpha * 0.14}) rotate(${precise * 0.16}deg)`;

    if (clamped >= 100) {
      completeChapter("tea");
      scene.classList.add("is-complete");
    } else {
      scene.classList.remove("is-complete");
    }
  };

  const addProgressFromMovement = (event) => {
    const angle = getPointerAngle(event);
    let delta = angle - lastAngle;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    lastAngle = angle;

    const usableDelta = Math.abs(delta) < 1.2 ? Math.abs(delta) : 0;
    accumulatedAngle = Math.min(completeAngle, accumulatedAngle + usableDelta);
    progress = Math.min(100, (accumulatedAngle / completeAngle) * 100);

    cupZone.classList.add("is-whisking");
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => cupZone.classList.remove("is-whisking"), 180);

    if (window.gsap) {
      gsap.to(cupZone, {
        rotation: delta > 0 ? 1.6 : -1.6,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
        overwrite: true,
        clearProps: "rotation"
      });
    }

    renderTeaProgress();
  };

  hitArea.addEventListener("pointerdown", (event) => {
    isPointerDown = true;
    lastAngle = getPointerAngle(event);
    hitArea.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  hitArea.addEventListener("pointermove", (event) => {
    if (!isPointerDown) return;
    addProgressFromMovement(event);
    event.preventDefault();
  });

  const stopWhisking = (event) => {
    isPointerDown = false;
    cupZone.classList.remove("is-whisking");
    if (event?.pointerId !== undefined) {
      hitArea.releasePointerCapture?.(event.pointerId);
    }
  };

  hitArea.addEventListener("pointerup", stopWhisking);
  hitArea.addEventListener("pointercancel", stopWhisking);
  hitArea.addEventListener("lostpointercapture", stopWhisking);

  hitArea.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== " ") return;
    event.preventDefault();
    accumulatedAngle = Math.min(completeAngle, accumulatedAngle + Math.PI / 2);
    progress = Math.min(100, (accumulatedAngle / completeAngle) * 100);
    renderTeaProgress();
  });

  resultButton?.addEventListener("click", () => {
    if (document.querySelector("#scene-6")) {
      showScene(6);
    }
  });

  renderTeaProgress();
}

function initScene6() {
  const scene = document.querySelector(".scene-6");
  const canvas = scene?.querySelector(".scene6-draw-canvas");
  const doneButton = scene?.querySelector(".scene6-done");
  const repaintButton = scene?.querySelector(".scene6-repaint");
  const cards = Array.from(scene?.querySelectorAll(".scene6-card") || []);
  const tip = scene?.querySelector(".scene6-tip");
  if (!scene || !canvas || !doneButton || !repaintButton) return;

  const tips = {
    bamboo: "提示：可以试着画一枝竹影，也可以自由发挥",
    lotus: "提示：可以试着画一朵莲花，也可以自由发挥",
    bird: "提示：可以试着画一只飞鸟，也可以自由发挥",
    butterfly: "提示：可以试着画一只蝴蝶，也可以自由发挥"
  };
  const minPathLength = 300;
  const minPoints = 30;
  let ctx = null;
  let dpr = 1;
  let isDrawing = false;
  let lastPoint = null;
  let pathLength = state.teaArt.pathLength || 0;
  let points = state.teaArt.points || 0;

  const updateDoneState = () => {
    const ready = pathLength >= minPathLength || points >= minPoints;
    doneButton.disabled = !ready;
    doneButton.classList.toggle("is-ready", ready);
  };

  const setupCanvas = (preserve = true) => {
    const rect = canvas.getBoundingClientRect();
    const cssSize = Math.round(Math.min(rect.width, rect.height));
    if (!cssSize) return false;

    const nextDpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    const nextSize = Math.round(cssSize * nextDpr);
    if (canvas.width === nextSize && canvas.height === nextSize && ctx) return true;

    const previous = preserve && canvas.width && canvas.height ? canvas.toDataURL("image/png") : "";
    canvas.width = nextSize;
    canvas.height = nextSize;
    dpr = nextDpr;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, nextSize, nextSize);

    if (previous) {
      const image = new Image();
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = previous;
    } else if (state.teaArt.dataUrl) {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.src = state.teaArt.dataUrl;
    }

    return true;
  };

  const getCanvasPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * dpr,
      y: (event.clientY - rect.top) * dpr
    };
  };

  const isInTeaSurface = (point) => {
    const radius = canvas.width * 0.49;
    const dx = point.x - canvas.width / 2;
    const dy = point.y - canvas.height / 2;
    return dx * dx + dy * dy <= radius * radius;
  };

  const clipTeaSurface = () => {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.49, 0, Math.PI * 2);
    ctx.clip();
  };

  const drawFoamDot = (point, alpha = 0.36) => {
    const radius = (2.6 + Math.random() * 2.4) * dpr;
    ctx.beginPath();
    ctx.fillStyle = `rgba(246, 245, 226, ${alpha})`;
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawSegment = (from, to) => {
    if (!ctx) return;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 1) return;

    ctx.save();
    clipTeaSurface();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "rgba(247, 246, 226, 0.58)";
    ctx.lineWidth = 18 * dpr;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = "rgba(70, 111, 65, 0.68)";
    ctx.lineWidth = 10 * dpr;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = "rgba(214, 231, 185, 0.32)";
    ctx.lineWidth = 4 * dpr;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    if (Math.random() > 0.42) {
      drawFoamDot(to, 0.26 + Math.random() * 0.24);
    }

    ctx.restore();
    pathLength += distance / dpr;
    points += 1;
    state.teaArt.pathLength = pathLength;
    state.teaArt.points = points;
    updateDoneState();
  };

  const saveDrawing = () => {
    if (!canvas.width || !canvas.height) return;
    state.teaArt.dataUrl = canvas.toDataURL("image/png");
    state.teaArt.pathLength = pathLength;
    state.teaArt.points = points;
  };

  const clearDrawing = () => {
    setupCanvas(false);
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    pathLength = 0;
    points = 0;
    lastPoint = null;
    state.teaArt = {
      dataUrl: "",
      pathLength: 0,
      points: 0
    };
    updateDoneState();
    window.renderScene16TeaArt?.();
  };

  canvas.addEventListener("pointerdown", (event) => {
    if (!setupCanvas(true)) return;
    const point = getCanvasPoint(event);
    if (!isInTeaSurface(point)) return;
    isDrawing = true;
    lastPoint = point;
    points += 1;
    drawFoamDot(point, 0.38);
    canvas.setPointerCapture?.(event.pointerId);
    updateDoneState();
    event.preventDefault();
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!isDrawing || !lastPoint) return;
    const point = getCanvasPoint(event);
    if (!isInTeaSurface(point)) return;
    drawSegment(lastPoint, point);
    lastPoint = point;
    event.preventDefault();
  });

  const stopDrawing = (event) => {
    if (!isDrawing) return;
    isDrawing = false;
    lastPoint = null;
    saveDrawing();
    if (event?.pointerId !== undefined) {
      canvas.releasePointerCapture?.(event.pointerId);
    }
  };

  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointercancel", stopDrawing);
  canvas.addEventListener("lostpointercapture", stopDrawing);
  repaintButton.addEventListener("click", clearDrawing);

  doneButton.addEventListener("click", () => {
    if (doneButton.disabled) return;
    setupCanvas(true);
    saveDrawing();
    window.renderScene16TeaArt?.();
    showScene(16);
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.toggle("is-active", item === card));
      if (tip) {
        tip.textContent = tips[card.dataset.pattern] || "提示：在茶沫表面轻轻划动，绘出你心中的图案";
      }
    });
  });

  window.addEventListener("resize", () => {
    if (!scene.classList.contains("active")) return;
    saveDrawing();
    setupCanvas(true);
  }, { passive: true });

  const params = new URLSearchParams(window.location.search);
  if (params.get("scene") === "6") {
    requestAnimationFrame(() => setupCanvas(true));
  }
  updateDoneState();
}

function initScene16() {
  const scene = document.querySelector(".scene-16");
  const art = scene?.querySelector(".scene16-art-overlay");
  const nextButton = scene?.querySelector(".scene16-next");
  if (!scene || !art || !nextButton) return;

  window.renderScene16TeaArt = () => {
    if (state.teaArt.dataUrl) {
      art.src = state.teaArt.dataUrl;
      art.hidden = false;
    } else {
      art.removeAttribute("src");
      art.hidden = true;
    }
  };

  nextButton.addEventListener("click", () => {
    if (document.querySelector("#scene-17")) {
      showScene(17);
    }
  });

  window.renderScene16TeaArt();
}

function initScene17() {
  const scene = document.querySelector(".scene-17");
  const backButton = scene?.querySelector(".scene17-back");
  if (!scene || !backButton) return;

  backButton.addEventListener("pointerdown", () => {
    backButton.classList.add("is-pressed");
  });

  const clearPress = () => backButton.classList.remove("is-pressed");
  backButton.addEventListener("pointerup", clearPress);
  backButton.addEventListener("pointercancel", clearPress);
  backButton.addEventListener("pointerleave", clearPress);

  backButton.addEventListener("click", () => {
    completeChapter("tea");
    if (document.querySelector("#scene-3")) {
      showScene(3);
    }
  });
}

function initScene7() {
  const startButton = document.querySelector(".scene7-start");
  if (!startButton) return;

  startButton.addEventListener("pointerdown", () => {
    startButton.classList.add("is-pressed");
  });

  const clearPress = () => startButton.classList.remove("is-pressed");
  startButton.addEventListener("pointerup", clearPress);
  startButton.addEventListener("pointercancel", clearPress);
  startButton.addEventListener("pointerleave", clearPress);

  startButton.addEventListener("click", () => {
    const goNext = () => {
      if (document.querySelector("#scene-8")) {
        showScene(8);
      }
    };

    if (window.gsap) {
      const art = startButton.querySelector("img") || startButton;
      gsap.fromTo(
        art,
        { scale: 0.985 },
        {
          scale: 1.02,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          clearProps: "scale",
          onComplete: goNext
        }
      );
      return;
    }

    goNext();
  });
}

function initScene10() {
  const startButton = document.querySelector(".scene10-start");
  if (!startButton) return;

  startButton.addEventListener("pointerdown", () => {
    startButton.classList.add("is-pressed");
  });

  const clearPress = () => startButton.classList.remove("is-pressed");
  startButton.addEventListener("pointerup", clearPress);
  startButton.addEventListener("pointercancel", clearPress);
  startButton.addEventListener("pointerleave", clearPress);

  startButton.addEventListener("click", () => {
    const goNext = () => {
      if (document.querySelector("#scene-11")) {
        showScene(11);
      }
    };

    if (window.gsap) {
      gsap.fromTo(
        startButton,
        { scale: 0.985 },
        {
          scale: 1.02,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          clearProps: "scale",
          onComplete: goNext
        }
      );
      return;
    }

    goNext();
  });
}

function initScene11() {
  const scene = document.querySelector(".scene-11");
  const cards = Array.from(document.querySelectorAll(".scene11-card"));
  const mouth = document.querySelector(".scene11-vase-mouth");
  const arrangement = document.querySelector(".scene11-arrangement");
  const insertedLayer = document.querySelector(".scene11-inserted-layer");
  const readout = document.querySelector(".scene11-readout strong");
  const resultButton = document.querySelector(".scene11-result-button");
  const title = document.querySelector(".scene11-title");
  if (!scene || !cards.length || !mouth || !arrangement || !insertedLayer || !readout || !resultButton || !title) return;

  const maxChoice = 3;
  const flowerTitle = {
    plum: "\u6885",
    orchid: "\u5170",
    bamboo: "\u7af9",
    chrysanthemum: "\u83ca",
    lotus: "\u8377"
  };
  const insertedFlowerSrc = {
    plum: "assets/png/scene11/flower-plum.png",
    orchid: "assets/png/scene11/flower-orchid.png",
    bamboo: "assets/png/scene11/flower-bamboo.png",
    chrysanthemum: "assets/png/scene11/flower-chrysanthemum.png",
    lotus: "assets/png/scene11/flower-lotus.png"
  };
  const design = { width: 670, height: 662 };
  let activeDrag = null;
  let selectedFlowers = state.flowerChoice
    .filter((type, index, list) => flowerTitle[type] && list.indexOf(type) === index)
    .slice(0, maxChoice);
  let selected = new Set(selectedFlowers);

  const flowerOrder = ["bamboo", "orchid", "plum", "chrysanthemum", "lotus"];
  const staticArrangementMode = false;
  scene.classList.remove("is-static-arrangement", "is-complete");
  const flowerGroupYOffset = -58;
  const flowerLayouts = {
    bamboo: {
      left: 118,
      top: -118,
      width: 280,
      rotate: 0,
      zIndex: 22
    },
    orchid: {
      left: 82,
      top: -160,
      width: 330,
      rotate: 0,
      zIndex: 24
    },
    plum: {
      left: 274,
      top: -132,
      width: 155,
      rotate: 0,
      zIndex: 27
    },
    chrysanthemum: {
      left: 320,
      top: 0,
      width: 170,
      rotate: 0,
      zIndex: 26
    },
    lotus: {
      left: 340,
      top: -154,
      width: 260,
      rotate: 0,
      zIndex: 25
    }
  };

  function isOverDropZone(clientX, clientY) {
    const rect = mouth.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  function normalizeFlowerList(list) {
    return list
      .filter((type, index) => flowerTitle[type] && list.indexOf(type) === index)
      .slice(0, maxChoice);
  }

  function getBranchSrc(type) {
    const card = cards.find((item) => item.dataset.flower === type);
    return card?.querySelector(".scene11-card-branch")?.getAttribute("src") || "";
  }

  function getInsertedSrc(type) {
    return insertedFlowerSrc[type] || "";
  }

  function getFlowerLayout(type) {
    const config = flowerLayouts[type] || flowerLayouts.plum;
    const width = config.width;
    if (typeof config.left === "number" && typeof config.top === "number") {
      return {
        left: config.left,
        top: config.top + flowerGroupYOffset,
        width,
        rotation: config.rotate || 0,
        flipX: Boolean(config.flipX),
        transformOrigin: config.transformOrigin || "50% 100%",
        zIndex: config.zIndex || 22
      };
    }
    const height = width * config.aspect;
    return {
      left: config.rootX - width * config.anchorX,
      top: config.rootY - height * config.anchorY,
      width,
      rotation: config.rotate,
      flipX: Boolean(config.flipX),
      transformOrigin: `${config.anchorX * 100}% ${config.anchorY * 100}%`,
      zIndex: config.zIndex || 22
    };
  }

  function getSceneTarget(type) {
    const layout = getFlowerLayout(type);
    const arrangementRect = arrangement.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();
    return {
      ...layout,
      left: arrangementRect.left - sceneRect.left + (layout.left / design.width) * arrangementRect.width,
      top: arrangementRect.top - sceneRect.top + (layout.top / design.height) * arrangementRect.height,
      width: (layout.width / design.width) * arrangementRect.width
    };
  }

  function createInsertedFlower(type, animate = false) {
    const src = getInsertedSrc(type);
    if (!src) return;
    const layout = getFlowerLayout(type);
    const isVisible = selected.has(type);

    const branch = document.createElement("img");
    branch.className = `scene11-inserted-flower scene11-inserted-${type}`;
    branch.classList.toggle("is-visible", isVisible);
    branch.classList.toggle("show", isVisible);
    branch.src = src;
    branch.alt = "";
    branch.dataset.flower = type;
    branch.style.left = `${(layout.left / design.width) * 100}%`;
    branch.style.top = `${(layout.top / design.height) * 100}%`;
    branch.style.width = `${(layout.width / design.width) * 100}%`;
    branch.style.transformOrigin = layout.transformOrigin;
    branch.style.zIndex = String(layout.zIndex);
    insertedLayer.appendChild(branch);

    if (window.gsap) {
      gsap.set(branch, {
        rotation: layout.rotation,
        scaleX: layout.flipX ? -1 : 1,
        scaleY: 1,
        transformOrigin: layout.transformOrigin,
        autoAlpha: isVisible && !animate ? 1 : 0
      });
      if (animate && isVisible) {
        gsap.fromTo(
          branch,
          { autoAlpha: 0, y: 26, scaleX: layout.flipX ? -0.82 : 0.82, scaleY: 0.82, rotation: layout.rotation - 3 },
          { autoAlpha: 1, y: 0, scaleX: layout.flipX ? -1 : 1, scaleY: 1, rotation: layout.rotation, duration: 0.44, ease: "power2.out" }
        );
      }
      return;
    }

    branch.style.transform = `rotate(${layout.rotation}deg) scaleX(${layout.flipX ? -1 : 1})`;
    branch.style.opacity = isVisible ? "1" : "0";
    branch.style.visibility = isVisible ? "visible" : "hidden";
  }

  function renderInsertedFlowers(animateType = "") {
    insertedLayer.replaceChildren();
    flowerOrder.forEach((type) => {
      createInsertedFlower(type, type === animateType);
    });
  }

  function renderFlowerState(animateType = "") {
    const count = selectedFlowers.length;
    state.flowerChoice = selectedFlowers.slice();
    state.scores.flower = Math.round((count / maxChoice) * 100);
    readout.textContent = `${count} / ${maxChoice}`;
    scene.classList.toggle("has-choice", count > 0);
    scene.classList.remove("is-complete");
    renderInsertedFlowers(animateType);

    cards.forEach((card) => {
      const type = card.dataset.flower;
      const isSelected = selected.has(type);
      card.classList.toggle("is-selected", isSelected);
      card.classList.toggle("is-disabled", isSelected || count >= maxChoice);
      card.setAttribute("aria-pressed", String(isSelected));
    });

    if (count >= maxChoice) {
      resultButton.disabled = false;
      resultButton.classList.add("is-ready");
      return;
    }

    resultButton.disabled = true;
    resultButton.classList.remove("is-ready");
  }

  function clearDragState(removeClone = false) {
    document.removeEventListener("pointermove", onDocumentPointerMove);
    document.removeEventListener("pointerup", onDocumentPointerUp);
    document.removeEventListener("pointercancel", onDocumentPointerCancel);
    scene.classList.remove("is-dragging", "is-over-vase");
    if (removeClone) {
      activeDrag?.clone?.remove();
    }
    activeDrag = null;
  }

  function onDocumentPointerMove(event) {
    moveDrag(event);
  }

  function onDocumentPointerUp(event) {
    finishDrag(event);
  }

  function onDocumentPointerCancel(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    activeDrag.clone.remove();
    activeDrag.card.releasePointerCapture?.(event.pointerId);
    clearDragState();
  }

  function makeDragClone(type, card) {
    const src = getBranchSrc(type);
    const layout = getFlowerLayout(type);
    const arrangementRect = arrangement.getBoundingClientRect();
    const clone = document.createElement("img");
    clone.className = "scene11-drag-clone";
    clone.src = src;
    clone.alt = "";
    clone.dataset.flower = type;
    clone.style.width = `${(layout.width / design.width) * arrangementRect.width}px`;
    clone.style.transformOrigin = layout.transformOrigin;
    scene.appendChild(clone);

    if (window.gsap) {
      gsap.set(clone, {
        rotation: layout.rotation,
        scaleX: layout.flipX ? -1 : 1,
        scaleY: 1,
        transformOrigin: layout.transformOrigin,
        autoAlpha: 1
      });
    } else {
      clone.style.opacity = "1";
      clone.style.transform = `rotate(${layout.rotation}deg) scaleX(${layout.flipX ? -1 : 1})`;
    }

    return clone;
  }

  function positionCloneAt(clone, clientX, clientY) {
    const sceneRect = scene.getBoundingClientRect();
    const cloneRect = clone.getBoundingClientRect();
    clone.style.left = `${clientX - sceneRect.left - cloneRect.width * 0.5}px`;
    clone.style.top = `${clientY - sceneRect.top - cloneRect.height * 0.96}px`;
  }

  function animateCloneToVase(type, clone) {
    const done = () => {
      clone.remove();
      renderFlowerState(type);
    };

    if (window.gsap) {
      gsap.to(clone, {
        autoAlpha: 0,
        scale: 0.76,
        duration: 0.22,
        ease: "power1.out",
        onComplete: done
      });
      return;
    }

    done();
  }

  function returnCloneToCard(clone, card) {
    const sceneRect = scene.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left = cardRect.left - sceneRect.left + cardRect.width * 0.14;
    const top = cardRect.top - sceneRect.top + cardRect.height * 0.08;

    if (window.gsap) {
      gsap.to(clone, {
        left,
        top,
        autoAlpha: 0,
        scale: 0.72,
        duration: 0.26,
        ease: "power2.out",
        onComplete: () => clone.remove()
      });
      return;
    }

    clone.remove();
  }

  function addFlower(type, clone = null, card = null) {
    if (!flowerTitle[type] || selected.has(type) || selectedFlowers.length >= maxChoice) {
      clone?.remove();
      return;
    }

    selectedFlowers.push(type);
    selected = new Set(selectedFlowers);

    const sourceCard = card || cards.find((item) => item.dataset.flower === type);
    const insertClone = clone || makeDragClone(type, sourceCard);
    if (!clone && sourceCard) {
      const rect = sourceCard.getBoundingClientRect();
      positionCloneAt(insertClone, rect.left + rect.width * 0.5, rect.top + rect.height * 0.52);
      if (window.gsap) {
        gsap.fromTo(insertClone, { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, duration: 0.16, ease: "power1.out" });
      }
    }

    animateCloneToVase(type, insertClone);
  }

  function startDrag(event) {
    if (activeDrag) return;
    if (event.button !== undefined && event.button !== 0) return;
    const card = event.currentTarget;
    const type = card.dataset.flower;
    if (selected.has(type) || selectedFlowers.length >= maxChoice) return;
    event.preventDefault();

    const clone = makeDragClone(type, card);
    activeDrag = {
      card,
      clone,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      type
    };

    scene.classList.add("is-dragging");
    card.setPointerCapture?.(event.pointerId);
    document.addEventListener("pointermove", onDocumentPointerMove);
    document.addEventListener("pointerup", onDocumentPointerUp);
    document.addEventListener("pointercancel", onDocumentPointerCancel);
    positionCloneAt(clone, event.clientX, event.clientY);

    if (window.gsap) {
      gsap.fromTo(clone, { autoAlpha: 0, scale: 0.82 }, { autoAlpha: 1, scale: 1, duration: 0.16, ease: "power1.out" });
    }
  }

  function moveDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    event.preventDefault();
    const dx = event.clientX - activeDrag.startX;
    const dy = event.clientY - activeDrag.startY;
    if (Math.hypot(dx, dy) > 7) {
      activeDrag.moved = true;
    }
    positionCloneAt(activeDrag.clone, event.clientX, event.clientY);
    scene.classList.toggle("is-over-vase", isOverDropZone(event.clientX, event.clientY));
  }

  function finishDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    event.preventDefault();
    const drag = activeDrag;
    const accepted = isOverDropZone(event.clientX, event.clientY);

    drag.card.releasePointerCapture?.(event.pointerId);
    clearDragState();

    if (accepted) {
      addFlower(drag.type, drag.clone, drag.card);
      return;
    }

    returnCloneToCard(drag.clone, drag.card);
  }

  if (!staticArrangementMode) {
    cards.forEach((card) => {
      card.addEventListener("pointerdown", startDrag);
      card.addEventListener("pointercancel", (event) => {
        if (activeDrag?.card === card) {
          activeDrag.clone.remove();
          card.releasePointerCapture?.(event.pointerId);
          clearDragState();
        }
      });
    });
  }

  resultButton.addEventListener("click", () => {
    if (staticArrangementMode) return;
    if (selectedFlowers.length < maxChoice) return;
    completeChapter("flower");
    showScene(12);
  });

  const debugFlower = new URLSearchParams(window.location.search).get("flower");
  if (!staticArrangementMode && debugFlower) {
    selectedFlowers = normalizeFlowerList(debugFlower.split(","));
    selected = new Set(selectedFlowers);
  }

  renderFlowerState("");
}

function initScene12() {
  const backButton = document.querySelector(".scene12-back");
  if (!backButton) return;

  backButton.addEventListener("pointerdown", () => {
    backButton.classList.add("is-pressed");
  });

  const clearPress = () => backButton.classList.remove("is-pressed");
  backButton.addEventListener("pointerup", clearPress);
  backButton.addEventListener("pointercancel", clearPress);
  backButton.addEventListener("pointerleave", clearPress);

  backButton.addEventListener("click", () => {
    completeChapter("flower");
    showScene(3);
  });
}

function initScene13() {
  const startButton = document.querySelector(".scene13-start");
  const scroll = document.querySelector(".scene13-scroll");
  if (!startButton) return;

  startButton.addEventListener("pointerdown", () => {
    startButton.classList.add("is-pressed");
  });

  const clearPress = () => startButton.classList.remove("is-pressed");
  startButton.addEventListener("pointerup", clearPress);
  startButton.addEventListener("pointercancel", clearPress);
  startButton.addEventListener("pointerleave", clearPress);

  startButton.addEventListener("click", () => {
    const goNext = () => {
      if (document.querySelector("#scene-14")) {
        showScene(14);
      }
    };

    if (window.gsap) {
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: goNext
      });

      timeline
        .fromTo(
          startButton,
          { scale: 0.985 },
          { scale: 1.02, duration: 0.16, yoyo: true, repeat: 1, clearProps: "scale" },
          0
        );

      if (scroll) {
        timeline.fromTo(
          scroll,
          { scaleY: 0.94, y: -8 },
          { scaleY: 1, y: 0, duration: 0.64, transformOrigin: "50% 9%", clearProps: "transform" },
          0.08
        );
      }
      return;
    }

    goNext();
  });
}

function initScene14() {
  const scene = document.querySelector(".scene-14");
  const dragZone = document.querySelector(".scene14-drag-zone");
  const progressText = document.querySelector(".scene14-progress-text strong");
  const startButton = document.querySelector(".scene14-start");
  const gesture = document.querySelector(".scene14-gesture");
  if (!scene || !dragZone || !progressText || !startButton) return;

  const maxDragDistance = 520;
  let progress = Math.max(0, Math.min(100, state.scores.painting || 0));
  let isDragging = false;
  let lastY = 0;
  let completionAnimated = false;

  const renderProgress = (value, animate = true) => {
    progress = Math.max(0, Math.min(100, Math.round(value)));
    state.scores.painting = progress;
    scene.style.setProperty("--painting-progress", String(progress));
    scene.style.setProperty("--painting-progress-width", `${progress}%`);
    scene.style.setProperty("--painting-offset", `${(100 - progress) * 2.3}px`);
    scene.style.setProperty("--painting-reveal", `${21 + progress * 0.79}%`);
    progressText.textContent = `${progress}%`;

    const isComplete = progress >= 100;
    scene.classList.toggle("has-started", progress > 0);
    if (gesture) gesture.hidden = progress > 0;
    scene.classList.toggle("is-complete", isComplete);
    startButton.disabled = !isComplete;
    startButton.classList.toggle("is-ready", isComplete);

    if (isComplete && animate && !completionAnimated && window.gsap && !reduceMotionQuery.matches) {
      completionAnimated = true;
      gsap.fromTo(
        startButton,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out", overwrite: "auto" }
      );
    }
  };

  const addDragProgress = (deltaY) => {
    if (deltaY <= 0 || progress >= 100) return;
    renderProgress(progress + (deltaY / maxDragDistance) * 100);
  };

  dragZone.addEventListener("pointerdown", (event) => {
    isDragging = true;
    lastY = event.clientY;
    dragZone.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  dragZone.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const deltaY = event.clientY - lastY;
    lastY = event.clientY;
    addDragProgress(deltaY);
  });

  const stopDrag = () => {
    isDragging = false;
  };

  dragZone.addEventListener("pointerup", stopDrag);
  dragZone.addEventListener("pointercancel", stopDrag);
  dragZone.addEventListener("lostpointercapture", stopDrag);

  dragZone.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === " ") {
      event.preventDefault();
      addDragProgress(55);
    }
  });

  startButton.addEventListener("pointerdown", () => {
    if (!startButton.disabled) startButton.classList.add("is-pressed");
  });

  const clearPress = () => startButton.classList.remove("is-pressed");
  startButton.addEventListener("pointerup", clearPress);
  startButton.addEventListener("pointercancel", clearPress);
  startButton.addEventListener("pointerleave", clearPress);

  startButton.addEventListener("click", () => {
    if (startButton.disabled) return;

    const goNext = () => {
      if (document.querySelector("#scene-15")) {
        showScene(15);
      }
    };

    if (window.gsap) {
      gsap.fromTo(
        startButton,
        { scale: 0.985 },
        {
          scale: 1.02,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          clearProps: "scale",
          onComplete: goNext
        }
      );
      return;
    }

    goNext();
  });

  const debugProgress = Number(new URLSearchParams(window.location.search).get("progress"));
  renderProgress(Number.isFinite(debugProgress) ? debugProgress : progress, false);
}

function initScene15() {
  const scene = document.querySelector(".scene-15");
  if (!scene) return;

  const targets = ["mountain", "boat", "pavilion"];
  const hotspots = Array.from(scene.querySelectorAll(".scene15-hotspot"));
  const tasks = Array.from(scene.querySelectorAll(".scene15-task"));
  const countText = scene.querySelector(".scene15-found b");
  const progressDots = Array.from(scene.querySelectorAll(".scene15-progress span"));
  const collectButton = scene.querySelector(".scene15-collect");
  if (!hotspots.length || !tasks.length || !countText || !collectButton) return;

  const found = new Set((state.foundPaintingItems || []).filter((item) => targets.includes(item)));

  const render = () => {
    const count = found.size;
    state.foundPaintingItems = targets.filter((target) => found.has(target));
    state.scores.painting = Math.round((count / targets.length) * 100);
    countText.textContent = String(count);

    hotspots.forEach((hotspot) => {
      const isFound = found.has(hotspot.dataset.target);
      hotspot.classList.toggle("is-found", isFound);
      hotspot.disabled = isFound;
    });

    tasks.forEach((task) => {
      task.classList.toggle("is-found", found.has(task.dataset.target));
    });

    progressDots.forEach((dot, index) => {
      dot.classList.toggle("is-on", index < count);
    });

    const isComplete = count === targets.length;
    scene.classList.toggle("is-complete", isComplete);
    collectButton.disabled = !isComplete;
    collectButton.classList.toggle("is-ready", isComplete);
  };

  const markFound = (target) => {
    if (!targets.includes(target) || found.has(target)) return;
    found.add(target);
    const hotspot = hotspots.find((item) => item.dataset.target === target);
    hotspot?.classList.add("is-tapped");
    window.setTimeout(() => hotspot?.classList.remove("is-tapped"), 520);
    render();
  };

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", () => markFound(hotspot.dataset.target));
  });

  tasks.forEach((task) => {
    task.addEventListener("click", () => markFound(task.dataset.target));
  });

  collectButton.addEventListener("click", () => {
    if (collectButton.disabled) return;
    completeChapter("painting");
    if (window.gsap && !reduceMotionQuery.matches) {
      gsap.fromTo(
        collectButton,
        { scale: 0.98 },
        { scale: 1.04, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out", clearProps: "scale" }
      );
    }
    window.setTimeout(() => {
      if (document.querySelector("#scene-18")) {
        showScene(18);
      }
    }, reduceMotionQuery.matches ? 0 : 300);
  });

  const foundParam = new URLSearchParams(window.location.search).get("found");
  if (foundParam) {
    foundParam.split(",").forEach((item) => {
      const target = item.trim();
      if (targets.includes(target)) found.add(target);
    });
  }

  render();
}

function initScene18() {
  const scene = document.querySelector(".scene-18");
  const backButton = scene?.querySelector(".scene18-back");
  if (!scene || !backButton) return;

  backButton.addEventListener("pointerdown", () => {
    backButton.classList.add("is-pressed");
  });

  const clearPress = () => backButton.classList.remove("is-pressed");
  backButton.addEventListener("pointerup", clearPress);
  backButton.addEventListener("pointercancel", clearPress);
  backButton.addEventListener("pointerleave", clearPress);

  backButton.addEventListener("click", () => {
    completeChapter("painting");
    if (document.querySelector("#scene-3")) {
      showScene(3);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileViewport();

  if (window.gsap) {
    document.body.classList.add("gsap-ready");
  }

  initHomeScene();
  initScene2();
  initScene3();
  initScene4();
  initScene5();
  initScene6();
  initScene7();
  initIncenseInteraction();
  initScene9();
  initScene10();
  initScene11();
  initScene12();
  initScene13();
  initPaintingInteraction();
  initScene15();
  initScene16();
  initScene17();
  initScene18();
  initScene19();
  updateChapterCards();

  const params = new URLSearchParams(window.location.search);
  if (params.get("static") === "1") {
    document.body.classList.add("static-check");
  }

  const doneParam = params.get("done");
  if (doneParam) {
    doneParam.split(",").forEach((type) => {
      const key = type.trim();
      if (state.completed[key] !== undefined) {
        state.completed[key] = true;
      }
    });
    updateChapterCards();
  }

  const sceneParam = Number(params.get("scene"));
  if (Number.isFinite(sceneParam) && sceneParam > 1) {
    const current = document.querySelector(".scene.active");
    const scene = document.querySelector(`#scene-${sceneParam}`);
    current?.classList.remove("active");
    scene?.classList.add("active");
    state.currentScene = sceneParam;
    if (sceneParam === 3) {
      updateChapterCards();
      refreshScene3Carousel(false);
    }
    if (sceneParam === 16) {
      window.renderScene16TeaArt?.();
    }
    requestAnimationFrame(() => {
      if (sceneParam === 3) {
        refreshScene3Carousel(false);
      }
      playSceneEntrance(sceneParam, scene);
    });
  }
});

