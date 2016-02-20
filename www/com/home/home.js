"use strict()";

var conceptsAPI = "./com/home/db/concepts.json";
var keywordsAPI = "./com/home/db/keywords.json";
var personalityAPI = "./com/home/db/personality.json";
var toneAPI = "./com/home/db/tone.json";
var analyzerAPI = "./com/home/db/analyzed.json"

function HomeCtrl($http, $ionicLoading) {
  console.log("HomeCtrl");

  var home = this;

  home.levelLabel = [
    "Broad",
    "Common",
    "Academic",
    "Specialized"
  ]

  home.classLabel = [
    "item-assertive",
    "item-energized",
    "item-balanced",
    "item-calm"
  ]

  home.idea = {
    raw: "", // Raw idea expression
    pitch: "", // The pitch
    keyData: null, // All keywords extractable
    related: null, // All related concepts, expecting about 30 mores of them
    tone: null,
    personality: null,
    conceptCollection: null
  };

  home.graph = {}

  function resetToneGraph() {
    home.graph.tone = {
      emotion: {
        labels: [],
        data: []
      },
      writing: {
        labels: [],
        data: []
      },
      social: {
        labels: [],
        data: []
      }
    }
  }

  function resetConceptGraph() {
    home.graph.conceptCollection = {};
  }

  function resetProfileGraph() {
    home.graph.personality = {};
    home.graph.personality = {
      bigFive: {
        data: [],
        labels: []
      },
      needs: {
        data: [],
        labels: []
      },
      values: {
        data: [],
        labels: []
      }
    }
  }

  home.getRandomIdea = function () {
    $http.jsonp("https://itsthisforthat.com/api.php?call=JSON_CALLBACK")
      .success(function (data) {
        console.log(data);

        // home.idea.product = data.this;
        // home.idea.market = data.that;

        home.idea.raw = "So, Basically, It's Like " + data.this + " for " + data.that + ".";
        console.log(home.idea.raw);
      });
  };

  function buildToneChart(toneType, tc) {
    for(var i = 0; i < tc.tones.length; i++) {
      toneType.labels.push(tc.tones[i].tone_name);
      toneType.data.push((tc.tones[i].score * 100)
        .toFixed(2));
    }
  }

  home.getTone = function () {
    resetToneGraph();
    $http.get("https://id34.mybluemix.net/pa/" + encodeURIComponent(home.idea.raw))
      .then(
        // $http.get(toneAPI)
        function (response) {
          console.log(response.data);

          home.idea.tone = response.data;

          var tc = response.data.document_tone.tone_categories;

          buildToneChart(home.graph.tone.emotion, tc[0]);
          buildToneChart(home.graph.tone.writing, tc[1]);
          buildToneChart(home.graph.tone.social, tc[2]);

        },
        function (err) {
          console.log(err);
        }
      )
  };

  function makeConceptGraph(cc) {
    var hgcc = home.graph.conceptCollection;
    for(var i = 0; i < cc.length; i++) {
      if(!hgcc[cc[i].keyword])
        hgcc[cc[i].keyword] = {
          data: [],
          labels: []
        }
      var c = cc[i].concepts;
      for(var j = 0; j < c.length; j++) {
        hgcc[cc[i].keyword].labels.push(c[j].concept.label);
        hgcc[cc[i].keyword].data.push((c[j].score * 100)
          .toFixed(2));
      }
    }
  }

  function traceTree(node, graph) {
    // body...
    if(node.percentage) {
      graph.labels.push(node.name);
      graph.data.push((node.percentage * 100)
        .toFixed(2));
    }
    if(!node.children)
      return;
    for(var i = 0; i < node.children.length; ++i) {
      traceTree(node.children[i], graph);
    }
  }

  function buildPersonalityGraph(iptc, hgp) {
    // body...
    traceTree(iptc[0], hgp.bigFive);
    traceTree(iptc[1], hgp.needs);
    traceTree(iptc[2], hgp.values);
    // console.log(hgp);
  }

  home.analyzeIdea = function () {
    resetConceptGraph();
    resetProfileGraph();

    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner><br>Analyzing your possible future',
      animation: 'fade-in'
    });

    home.getTone();

    $http.get("https://id34.mybluemix.net/ai/" + encodeURIComponent(home.idea.raw))
    // $http.get(analyzerAPI)
      .then(
        function (response) {
          console.log(response.data);

          home.idea.personality = response.data.profile;

          home.idea.conceptCollection = response.data.conceptCollection;

          makeConceptGraph(home.idea.conceptCollection);

          buildPersonalityGraph(home.idea.personality.tree.children, home.graph.personality);

          $ionicLoading.hide();
        },
        function (err) {
          $ionicLoading.hide();
          alert("Too vague Idea, no keywords found...");
          return console.log(err);
        }
      );
  }

  home.getRandomIdea();

  //* //////////////////////////////////////////////

  // home.getRelatedConcepts();
  // home.getTone();
  // home.getPersonality();

  //*/////////////////////////////////////////////

}
