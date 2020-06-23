import ImgixClient from "imgix-core-js";
import lazySizes from "lazysizes";

var lazySizesDirective = {};

lazySizesDirective.install = function(Vue) {
  let client = new ImgixClient({
    domain: "www.datocms-assets.com"
  });

  Vue.directive("image", {
    bind: function(el, binding) {
      var params = binding.value || "";
      el.setAttribute("data-sizes", "auto");
      el.setAttribute(
        "data-srcset",
        client.buildSrcSet(
          el.dataset.src.replace("https://www.datocms-assets.com", ""),
          params,
          {
          widthTolerance: 0.5
        }
        )
      );
      el.classList.add("lazyload");
    }
  });

  window.lazySizesConfig = window.lazySizesConfig || {};
  lazySizesConfig.loadMode = 1;
  lazySizesConfig.expFactor = 4;
  lazySizesConfig.init = false;
};

export default lazySizesDirective;
