(() => {
  const shell = document.querySelector(".incense-shell");
  const smokeField = document.querySelector(".smoke-field");
  const smokePaths = Array.from(document.querySelectorAll(".smoke-lines path"));
  const hotspot = document.querySelector(".incense-hotspot");
  const fill = document.querySelector(".progress-fill");
  const percentText = document.querySelector(".progress-text strong");
  const titleText = document.querySelector(".title-text");
  const resultButton = document.querySelector(".enter-result");

  if (!shell || !smokeField || !hotspot || !fill || !percentText || !resultButton) return;

  const holdDuration = 3000;
  let progress = 0;
  let holdStart = 0;
  let rafId = 0;
  let isHolding = false;
  let isComplete = false;

  smokePaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function setProgress(value) {
    progress = clamp(value, 0, 100);
    const p = progress / 100;
    const easedSmoke = p * p * (3 - 2 * p);

    smokeField.style.setProperty("--p", easedSmoke.toFixed(4));
    smokeField.style.setProperty("--smoke-opacity", String(clamp(easedSmoke * 1.08, 0, 1)));
    smokePaths.forEach((path, index) => {
      const length = Number(path.style.strokeDasharray) || path.getTotalLength();
      const delay = index * 0.08;
      const reveal = clamp((easedSmoke - delay) / (1 - delay), 0, 1);
      path.style.strokeDashoffset = `${length * (1 - reveal)}`;
    });
    fill.style.width = `${progress.toFixed(1)}%`;
    percentText.textContent = `${Math.round(progress)}%`;

    if (titleText) {
      titleText.textContent = progress >= 100
        ? "一炉香起，心境渐安"
        : progress > 35
          ? "保持长按，让烟气绵延"
          : "长按香头，待烟气升起";
    }
  }

  function complete() {
    isComplete = true;
    isHolding = false;
    shell.classList.remove("is-holding");
    shell.classList.add("is-complete");
    setProgress(100);
    resultButton.disabled = false;
    resultButton.classList.add("is-ready");
    cancelAnimationFrame(rafId);
  }

  function tick(now) {
    if (!isHolding || isComplete) return;
    const elapsed = now - holdStart;
    const nextProgress = (elapsed / holdDuration) * 100;

    if (nextProgress >= 100) {
      complete();
      return;
    }

    setProgress(nextProgress);
    rafId = requestAnimationFrame(tick);
  }

  function startHold(event) {
    if (isComplete) return;
    event.preventDefault();
    isHolding = true;
    holdStart = performance.now() - (progress / 100) * holdDuration;
    shell.classList.add("is-holding");
    if (event.pointerId !== undefined) {
      hotspot.setPointerCapture?.(event.pointerId);
    }
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function resetIncomplete() {
    if (isComplete) return;
    isHolding = false;
    shell.classList.remove("is-holding");
    cancelAnimationFrame(rafId);
    setProgress(0);
  }

  if ("PointerEvent" in window) {
    hotspot.addEventListener("pointerdown", startHold);
    hotspot.addEventListener("pointerup", resetIncomplete);
    hotspot.addEventListener("pointercancel", resetIncomplete);
    hotspot.addEventListener("pointerleave", resetIncomplete);
    hotspot.addEventListener("lostpointercapture", resetIncomplete);
  } else {
    hotspot.addEventListener("mousedown", startHold);
    window.addEventListener("mouseup", resetIncomplete);
    hotspot.addEventListener("mouseleave", resetIncomplete);
    hotspot.addEventListener("touchstart", startHold, { passive: false });
    window.addEventListener("touchend", resetIncomplete);
    window.addEventListener("touchcancel", resetIncomplete);
  }

  hotspot.addEventListener("touchstart", (event) => event.preventDefault(), { passive: false });
  hotspot.addEventListener("contextmenu", (event) => event.preventDefault());

  resultButton.addEventListener("click", () => {
    if (!isComplete) return;
    if (typeof window.showScene === "function" && document.querySelector("#scene-9")) {
      window.showScene(9);
      return;
    }
    window.dispatchEvent(new CustomEvent("incense:complete", { detail: { progress: 100 } }));
  });

  const debugProgress = Number(new URLSearchParams(window.location.search).get("progress"));
  if (Number.isFinite(debugProgress) && debugProgress >= 100) {
    complete();
  } else if (Number.isFinite(debugProgress) && debugProgress > 0) {
    setProgress(debugProgress);
  } else {
    setProgress(0);
  }
})();
