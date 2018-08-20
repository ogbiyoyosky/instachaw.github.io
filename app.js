/******/ (function(modules) {
  // webpackBootstrap
  /******/ function hotDownloadUpdateChunk(chunkId) {
    // eslint-disable-line no-unused-vars
    /******/ var chunk = require("./" +
      "" +
      chunkId +
      "." +
      hotCurrentHash +
      ".hot-update.js");
    /******/ hotAddUpdateChunk(chunk.id, chunk.modules);
    /******/
  }
  /******/

  /******/ function hotDownloadManifest() {
    // eslint-disable-line no-unused-vars
    /******/ try {
      /******/ var update = require("./" +
        "" +
        hotCurrentHash +
        ".hot-update.json");
      /******/
    } catch (e) {
      /******/ return Promise.resolve();
      /******/
    }
    /******/ return Promise.resolve(update);
    /******/
  }
  /******/

  /******/ function hotDisposeChunk(chunkId) {
    //eslint-disable-line no-unused-vars
    /******/ delete installedChunks[chunkId];
    /******/
  }
  /******/
  /******/

  /******/

  /******/ var hotApplyOnUpdate = true;
  /******/ var hotCurrentHash = "0dcdd40a71610effe00e"; // eslint-disable-line no-unused-vars
  /******/ var hotRequestTimeout = 10000;
  /******/ var hotCurrentModuleData = {};
  /******/ var hotCurrentChildModule; // eslint-disable-line no-unused-vars
  /******/ var hotCurrentParents = []; // eslint-disable-line no-unused-vars
  /******/ var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
  /******/

  /******/ function hotCreateRequire(moduleId) {
    // eslint-disable-line no-unused-vars
    /******/ var me = installedModules[moduleId];
    /******/ if (!me) return __webpack_require__;
    /******/ var fn = function(request) {
      /******/ if (me.hot.active) {
        /******/ if (installedModules[request]) {
          /******/ if (installedModules[request].parents.indexOf(moduleId) < 0)
            /******/ installedModules[request].parents.push(moduleId);
          /******/
        } else {
          /******/ hotCurrentParents = [moduleId];
          /******/ hotCurrentChildModule = request;
          /******/
        }
        /******/ if (me.children.indexOf(request) < 0)
          /******/ me.children.push(request);
        /******/
      } else {
        /******/ console.warn(
          "[HMR] unexpected require(" +
            request +
            ") from disposed module " +
            moduleId
        );
        /******/ hotCurrentParents = [];
        /******/
      }
      /******/ return __webpack_require__(request);
      /******/
    };
    /******/ var ObjectFactory = function ObjectFactory(name) {
      /******/ return {
        /******/ configurable: true,
        /******/ enumerable: true,
        /******/ get: function() {
          /******/ return __webpack_require__[name];
          /******/
        },
        /******/ set: function(value) {
          /******/ __webpack_require__[name] = value;
          /******/
        }
        /******/
      };
      /******/
    };
    /******/ for (var name in __webpack_require__) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
        name !== "e"
      ) {
        /******/ Object.defineProperty(fn, name, ObjectFactory(name));
        /******/
      }
      /******/
    }
    /******/ fn.e = function(chunkId) {
      /******/ if (hotStatus === "ready") /******/ hotSetStatus("prepare");
      /******/ hotChunksLoading++;
      /******/ return __webpack_require__
        .e(chunkId)
        .then(finishChunkLoading, function(err) {
          /******/ finishChunkLoading();
          /******/ throw err;
          /******/
        });
      /******/

      /******/ function finishChunkLoading() {
        /******/ hotChunksLoading--;
        /******/ if (hotStatus === "prepare") {
          /******/ if (!hotWaitingFilesMap[chunkId]) {
            /******/ hotEnsureUpdateChunk(chunkId);
            /******/
          }
          /******/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /******/ hotUpdateDownloaded();
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/ return fn;
    /******/
  }
  /******/

  /******/ function hotCreateModule(moduleId) {
    // eslint-disable-line no-unused-vars
    /******/ var hot = {
      /******/ // private stuff
      /******/ _acceptedDependencies: {},
      /******/ _declinedDependencies: {},
      /******/ _selfAccepted: false,
      /******/ _selfDeclined: false,
      /******/ _disposeHandlers: [],
      /******/ _main: hotCurrentChildModule !== moduleId, // Module API
      /******/

      /******/ /******/ active: true,
      /******/ accept: function(dep, callback) {
        /******/ if (typeof dep === "undefined")
          /******/ hot._selfAccepted = true;
        else if (typeof dep === "function")
          /******/ /******/ hot._selfAccepted = dep;
        else if (typeof dep === "object")
          /******/ /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._acceptedDependencies[dep[i]] =
              callback || function() {};
        else
          /******/ /******/ hot._acceptedDependencies[dep] =
            callback || function() {};
        /******/
      },
      /******/ decline: function(dep) {
        /******/ if (typeof dep === "undefined")
          /******/ hot._selfDeclined = true;
        else if (typeof dep === "object")
          /******/ /******/ for (var i = 0; i < dep.length; i++)
            /******/ hot._declinedDependencies[dep[i]] = true;
        else /******/ /******/ hot._declinedDependencies[dep] = true;
        /******/
      },
      /******/ dispose: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ addDisposeHandler: function(callback) {
        /******/ hot._disposeHandlers.push(callback);
        /******/
      },
      /******/ removeDisposeHandler: function(callback) {
        /******/ var idx = hot._disposeHandlers.indexOf(callback);
        /******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /******/
      }, // Management API
      /******/

      /******/ /******/ check: hotCheck,
      /******/ apply: hotApply,
      /******/ status: function(l) {
        /******/ if (!l) return hotStatus;
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ addStatusHandler: function(l) {
        /******/ hotStatusHandlers.push(l);
        /******/
      },
      /******/ removeStatusHandler: function(l) {
        /******/ var idx = hotStatusHandlers.indexOf(l);
        /******/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /******/
      }, //inherit from previous dispose call
      /******/

      /******/ /******/ data: hotCurrentModuleData[moduleId]
      /******/
    };
    /******/ hotCurrentChildModule = undefined;
    /******/ return hot;
    /******/
  }
  /******/

  /******/ var hotStatusHandlers = [];
  /******/ var hotStatus = "idle";
  /******/

  /******/ function hotSetStatus(newStatus) {
    /******/ hotStatus = newStatus;
    /******/ for (var i = 0; i < hotStatusHandlers.length; i++)
      /******/ hotStatusHandlers[i].call(null, newStatus);
    /******/
  } // while downloading
  /******/

  /******/ /******/ var hotWaitingFiles = 0;
  /******/ var hotChunksLoading = 0;
  /******/ var hotWaitingFilesMap = {};
  /******/ var hotRequestedFilesMap = {};
  /******/ var hotAvailableFilesMap = {};
  /******/ var hotDeferred; // The update info
  /******/

  /******/ /******/ var hotUpdate, hotUpdateNewHash;
  /******/

  /******/ function toModuleId(id) {
    /******/ var isNumber = +id + "" === id;
    /******/ return isNumber ? +id : id;
    /******/
  }
  /******/

  /******/ function hotCheck(apply) {
    /******/ if (hotStatus !== "idle")
      throw new Error("check() is only allowed in idle status");
    /******/ hotApplyOnUpdate = apply;
    /******/ hotSetStatus("check");
    /******/ return hotDownloadManifest(hotRequestTimeout).then(function(
      update
    ) {
      /******/ if (!update) {
        /******/ hotSetStatus("idle");
        /******/ return null;
        /******/
      }
      /******/ hotRequestedFilesMap = {};
      /******/ hotWaitingFilesMap = {};
      /******/ hotAvailableFilesMap = update.c;
      /******/ hotUpdateNewHash = update.h;
      /******/

      /******/ hotSetStatus("prepare");
      /******/ var promise = new Promise(function(resolve, reject) {
        /******/ hotDeferred = {
          /******/ resolve: resolve,
          /******/ reject: reject
          /******/
        };
        /******/
      });
      /******/ hotUpdate = {};
      /******/ var chunkId = 0;
      /******/ {
        // eslint-disable-line no-lone-blocks
        /******/ /*globals chunkId */
        /******/ hotEnsureUpdateChunk(chunkId);
        /******/
      }
      /******/ if (
        hotStatus === "prepare" &&
        hotChunksLoading === 0 &&
        hotWaitingFiles === 0
      ) {
        /******/ hotUpdateDownloaded();
        /******/
      }
      /******/ return promise;
      /******/
    });
    /******/
  }
  /******/

  /******/ function hotAddUpdateChunk(chunkId, moreModules) {
    // eslint-disable-line no-unused-vars
    /******/ if (
      !hotAvailableFilesMap[chunkId] ||
      !hotRequestedFilesMap[chunkId]
    )
      /******/ return;
    /******/ hotRequestedFilesMap[chunkId] = false;
    /******/ for (var moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ hotUpdate[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /******/ hotUpdateDownloaded();
      /******/
    }
    /******/
  }
  /******/

  /******/ function hotEnsureUpdateChunk(chunkId) {
    /******/ if (!hotAvailableFilesMap[chunkId]) {
      /******/ hotWaitingFilesMap[chunkId] = true;
      /******/
    } else {
      /******/ hotRequestedFilesMap[chunkId] = true;
      /******/ hotWaitingFiles++;
      /******/ hotDownloadUpdateChunk(chunkId);
      /******/
    }
    /******/
  }
  /******/

  /******/ function hotUpdateDownloaded() {
    /******/ hotSetStatus("ready");
    /******/ var deferred = hotDeferred;
    /******/ hotDeferred = null;
    /******/ if (!deferred) return;
    /******/ if (hotApplyOnUpdate) {
      /******/ // Wrap deferred object in Promise to mark it as a well-handled Promise to
      /******/ // avoid triggering uncaught exception warning in Chrome.
      /******/ // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /******/ Promise.resolve()
        .then(function() {
          /******/ return hotApply(hotApplyOnUpdate);
          /******/
        })
        .then(
          /******/ function(result) {
            /******/ deferred.resolve(result);
            /******/
          },
          /******/ function(err) {
            /******/ deferred.reject(err);
            /******/
          }
          /******/
        );
      /******/
    } else {
      /******/ var outdatedModules = [];
      /******/ for (var id in hotUpdate) {
        /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/ outdatedModules.push(toModuleId(id));
          /******/
        }
        /******/
      }
      /******/ deferred.resolve(outdatedModules);
      /******/
    }
    /******/
  }
  /******/

  /******/ function hotApply(options) {
    /******/ if (hotStatus !== "ready")
      throw new Error("apply() is only allowed in ready status");
    /******/ options = options || {};
    /******/

    /******/ var cb;
    /******/ var i;
    /******/ var j;
    /******/ var module;
    /******/ var moduleId;
    /******/

    /******/ function getAffectedStuff(updateModuleId) {
      /******/ var outdatedModules = [updateModuleId];
      /******/ var outdatedDependencies = {};
      /******/

      /******/ var queue = outdatedModules.slice().map(function(id) {
        /******/ return {
          /******/ chain: [id],
          /******/ id: id
          /******/
        };
        /******/
      });
      /******/ while (queue.length > 0) {
        /******/ var queueItem = queue.pop();
        /******/ var moduleId = queueItem.id;
        /******/ var chain = queueItem.chain;
        /******/ module = installedModules[moduleId];
        /******/ if (!module || module.hot._selfAccepted) /******/ continue;
        /******/ if (module.hot._selfDeclined) {
          /******/ return {
            /******/ type: "self-declined",
            /******/ chain: chain,
            /******/ moduleId: moduleId
            /******/
          };
          /******/
        }
        /******/ if (module.hot._main) {
          /******/ return {
            /******/ type: "unaccepted",
            /******/ chain: chain,
            /******/ moduleId: moduleId
            /******/
          };
          /******/
        }
        /******/ for (var i = 0; i < module.parents.length; i++) {
          /******/ var parentId = module.parents[i];
          /******/ var parent = installedModules[parentId];
          /******/ if (!parent) continue;
          /******/ if (parent.hot._declinedDependencies[moduleId]) {
            /******/ return {
              /******/ type: "declined",
              /******/ chain: chain.concat([parentId]),
              /******/ moduleId: moduleId,
              /******/ parentId: parentId
              /******/
            };
            /******/
          }
          /******/ if (outdatedModules.indexOf(parentId) >= 0) continue;
          /******/ if (parent.hot._acceptedDependencies[moduleId]) {
            /******/ if (!outdatedDependencies[parentId])
              /******/ outdatedDependencies[parentId] = [];
            /******/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /******/ continue;
            /******/
          }
          /******/ delete outdatedDependencies[parentId];
          /******/ outdatedModules.push(parentId);
          /******/ queue.push({
            /******/ chain: chain.concat([parentId]),
            /******/ id: parentId
            /******/
          });
          /******/
        }
        /******/
      }
      /******/

      /******/ return {
        /******/ type: "accepted",
        /******/ moduleId: updateModuleId,
        /******/ outdatedModules: outdatedModules,
        /******/ outdatedDependencies: outdatedDependencies
        /******/
      };
      /******/
    }
    /******/

    /******/ function addAllToSet(a, b) {
      /******/ for (var i = 0; i < b.length; i++) {
        /******/ var item = b[i];
        /******/ if (a.indexOf(item) < 0) /******/ a.push(item);
        /******/
      }
      /******/
    } // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
    /******/

    /******/ /******/ /******/ var outdatedDependencies = {};
    /******/ var outdatedModules = [];
    /******/ var appliedUpdate = {};
    /******/

    /******/ var warnUnexpectedRequire = function warnUnexpectedRequire() {
      /******/ console.warn(
        "[HMR] unexpected require(" + result.moduleId + ") to disposed module"
      );
      /******/
    };
    /******/

    /******/ for (var id in hotUpdate) {
      /******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /******/ moduleId = toModuleId(id);
        /******/ var result;
        /******/ if (hotUpdate[id]) {
          /******/ result = getAffectedStuff(moduleId);
          /******/
        } else {
          /******/ result = {
            /******/ type: "disposed",
            /******/ moduleId: id
            /******/
          };
          /******/
        }
        /******/ var abortError = false;
        /******/ var doApply = false;
        /******/ var doDispose = false;
        /******/ var chainInfo = "";
        /******/ if (result.chain) {
          /******/ chainInfo =
            "\nUpdate propagation: " + result.chain.join(" -> ");
          /******/
        }
        /******/ switch (result.type) {
          /******/ case "self-declined":
            /******/ if (options.onDeclined)
              /******/ options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                "Aborted because of self decline: " +
                  result.moduleId +
                  chainInfo
              );
            /******/ break;
          /******/ case "declined":
            /******/ if (options.onDeclined)
              /******/ options.onDeclined(result);
            /******/ if (!options.ignoreDeclined)
              /******/ abortError = new Error(
                "Aborted because of declined dependency: " +
                  result.moduleId +
                  " in " +
                  result.parentId +
                  chainInfo
              );
            /******/ break;
          /******/ case "unaccepted":
            /******/ if (options.onUnaccepted)
              /******/ options.onUnaccepted(result);
            /******/ if (!options.ignoreUnaccepted)
              /******/ abortError = new Error(
                "Aborted because " + moduleId + " is not accepted" + chainInfo
              );
            /******/ break;
          /******/ case "accepted":
            /******/ if (options.onAccepted)
              /******/ options.onAccepted(result);
            /******/ doApply = true;
            /******/ break;
          /******/ case "disposed":
            /******/ if (options.onDisposed)
              /******/ options.onDisposed(result);
            /******/ doDispose = true;
            /******/ break;
          /******/ default:
            /******/ throw new Error("Unexception type " + result.type);
          /******/
        }
        /******/ if (abortError) {
          /******/ hotSetStatus("abort");
          /******/ return Promise.reject(abortError);
          /******/
        }
        /******/ if (doApply) {
          /******/ appliedUpdate[moduleId] = hotUpdate[moduleId];
          /******/ addAllToSet(outdatedModules, result.outdatedModules);
          /******/ for (moduleId in result.outdatedDependencies) {
            /******/ if (
              Object.prototype.hasOwnProperty.call(
                result.outdatedDependencies,
                moduleId
              )
            ) {
              /******/ if (!outdatedDependencies[moduleId])
                /******/ outdatedDependencies[moduleId] = [];
              /******/ addAllToSet(
                outdatedDependencies[moduleId],
                result.outdatedDependencies[moduleId]
              );
              /******/
            }
            /******/
          }
          /******/
        }
        /******/ if (doDispose) {
          /******/ addAllToSet(outdatedModules, [result.moduleId]);
          /******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
          /******/
        }
        /******/
      }
      /******/
    } // Store self accepted outdated modules to require them later by the module system
    /******/

    /******/ /******/ var outdatedSelfAcceptedModules = [];
    /******/ for (i = 0; i < outdatedModules.length; i++) {
      /******/ moduleId = outdatedModules[i];
      /******/ if (
        installedModules[moduleId] &&
        installedModules[moduleId].hot._selfAccepted
      )
        /******/ outdatedSelfAcceptedModules.push({
          /******/ module: moduleId,
          /******/ errorHandler: installedModules[moduleId].hot._selfAccepted
          /******/
        });
      /******/
    } // Now in "dispose" phase
    /******/

    /******/ /******/ hotSetStatus("dispose");
    /******/ Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
      /******/ if (hotAvailableFilesMap[chunkId] === false) {
        /******/ hotDisposeChunk(chunkId);
        /******/
      }
      /******/
    });
    /******/

    /******/ var idx;
    /******/ var queue = outdatedModules.slice();
    /******/ while (queue.length > 0) {
      /******/ moduleId = queue.pop();
      /******/ module = installedModules[moduleId];
      /******/ if (!module) continue;
      /******/

      /******/ var data = {}; // Call dispose handlers
      /******/

      /******/ /******/ var disposeHandlers = module.hot._disposeHandlers;
      /******/ for (j = 0; j < disposeHandlers.length; j++) {
        /******/ cb = disposeHandlers[j];
        /******/ cb(data);
        /******/
      }
      /******/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
      /******/

      /******/ /******/ module.hot.active = false; // remove module from cache
      /******/

      /******/ /******/ delete installedModules[moduleId]; // when disposing there is no need to call dispose handler
      /******/

      /******/ /******/ delete outdatedDependencies[moduleId]; // remove "parents" references from all children
      /******/

      /******/ /******/ for (j = 0; j < module.children.length; j++) {
        /******/ var child = installedModules[module.children[j]];
        /******/ if (!child) continue;
        /******/ idx = child.parents.indexOf(moduleId);
        /******/ if (idx >= 0) {
          /******/ child.parents.splice(idx, 1);
          /******/
        }
        /******/
      }
      /******/
    } // remove outdated dependency from module children
    /******/

    /******/ /******/ var dependency;
    /******/ var moduleOutdatedDependencies;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /******/ dependency = moduleOutdatedDependencies[j];
            /******/ idx = module.children.indexOf(dependency);
            /******/ if (idx >= 0) module.children.splice(idx, 1);
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Not in "apply" phase
    /******/

    /******/ /******/ hotSetStatus("apply");
    /******/

    /******/ hotCurrentHash = hotUpdateNewHash; // insert new code
    /******/

    /******/ /******/ for (moduleId in appliedUpdate) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
      ) {
        /******/ modules[moduleId] = appliedUpdate[moduleId];
        /******/
      }
      /******/
    } // call accept handlers
    /******/

    /******/ /******/ var error = null;
    /******/ for (moduleId in outdatedDependencies) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
      ) {
        /******/ module = installedModules[moduleId];
        /******/ if (module) {
          /******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /******/ var callbacks = [];
          /******/ for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /******/ dependency = moduleOutdatedDependencies[i];
            /******/ cb = module.hot._acceptedDependencies[dependency];
            /******/ if (cb) {
              /******/ if (callbacks.indexOf(cb) >= 0) continue;
              /******/ callbacks.push(cb);
              /******/
            }
            /******/
          }
          /******/ for (i = 0; i < callbacks.length; i++) {
            /******/ cb = callbacks[i];
            /******/ try {
              /******/ cb(moduleOutdatedDependencies);
              /******/
            } catch (err) {
              /******/ if (options.onErrored) {
                /******/ options.onErrored({
                  /******/ type: "accept-errored",
                  /******/ moduleId: moduleId,
                  /******/ dependencyId: moduleOutdatedDependencies[i],
                  /******/ error: err
                  /******/
                });
                /******/
              }
              /******/ if (!options.ignoreErrored) {
                /******/ if (!error) /******/ error = err;
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // Load self accepted modules
    /******/

    /******/ /******/ for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /******/ var item = outdatedSelfAcceptedModules[i];
      /******/ moduleId = item.module;
      /******/ hotCurrentParents = [moduleId];
      /******/ try {
        /******/ __webpack_require__(moduleId);
        /******/
      } catch (err) {
        /******/ if (typeof item.errorHandler === "function") {
          /******/ try {
            /******/ item.errorHandler(err);
            /******/
          } catch (err2) {
            /******/ if (options.onErrored) {
              /******/ options.onErrored({
                /******/ type: "self-accept-error-handler-errored",
                /******/ moduleId: moduleId,
                /******/ error: err2,
                /******/ orginalError: err, // TODO remove in webpack 4
                /******/ originalError: err
                /******/
              });
              /******/
            }
            /******/ if (!options.ignoreErrored) {
              /******/ if (!error) /******/ error = err2;
              /******/
            }
            /******/ if (!error) /******/ error = err;
            /******/
          }
          /******/
        } else {
          /******/ if (options.onErrored) {
            /******/ options.onErrored({
              /******/ type: "self-accept-errored",
              /******/ moduleId: moduleId,
              /******/ error: err
              /******/
            });
            /******/
          }
          /******/ if (!options.ignoreErrored) {
            /******/ if (!error) /******/ error = err;
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    } // handle errors in accept handlers and self accepted module load
    /******/

    /******/ /******/ if (error) {
      /******/ hotSetStatus("fail");
      /******/ return Promise.reject(error);
      /******/
    }
    /******/

    /******/ hotSetStatus("idle");
    /******/ return new Promise(function(resolve) {
      /******/ resolve(outdatedModules);
      /******/
    });
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/ hot: hotCreateModule(moduleId),
      /******/ parents: ((hotCurrentParentsTemp = hotCurrentParents),
      (hotCurrentParents = []),
      hotCurrentParentsTemp),
      /******/ children: []
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      hotCreateRequire(moduleId)
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // __webpack_hash__
  /******/
  /******/ /******/ __webpack_require__.h = function() {
    return hotCurrentHash;
  }; // Load entry module and return exports
  /******/
  /******/ /******/ return hotCreateRequire(0)((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ /***/ "./app.babel.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '/* WEBPACK VAR INJECTION */(function(__dirname) {/* global  __dirname */\n/* global  process */\n\n\n\nvar _fs = __webpack_require__("fs");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _https = __webpack_require__("https");\n\nvar _https2 = _interopRequireDefault(_https);\n\nvar _path = __webpack_require__("path");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _express = __webpack_require__("express");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _expressHandlebars = __webpack_require__("express-handlebars");\n\nvar _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);\n\nvar _handlebars = __webpack_require__("handlebars");\n\nvar _handlebars2 = _interopRequireDefault(_handlebars);\n\nvar _bodyParser = __webpack_require__("body-parser");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _compression = __webpack_require__("compression");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _expressSession = __webpack_require__("express-session");\n\nvar _expressSession2 = _interopRequireDefault(_expressSession);\n\nvar _server2 = __webpack_require__("./server/server.js");\n\nvar _routing = __webpack_require__("./server/helpers/routing.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// configuration\n\n\n// custom helpers\nvar config = {\n  environment: undefined || "development",\n  isHttps: false === "true" || false\n};\n\nvar app = (0, _express2.default)();\napp.use((0, _compression2.default)());\n\nvar viewsDir = "./templates";\n\n// setup express to use handlebars as the templating engine\nvar hbs = _expressHandlebars2.default.create({\n  defaultLayout: "main",\n  layoutsDir: _path2.default.join(__dirname, viewsDir + "/layouts"),\n  partialsDir: _path2.default.join(__dirname, viewsDir + "/partials"),\n  extname: ".hbs"\n});\n\n// allows partials to be organised in subfolders\nhbs.getTemplates(_path2.default.join(__dirname, viewsDir + "/partials")).then(function (partials) {\n  for (var partial in partials) {\n    _handlebars2.default.registerPartial(partial, "{{" + partial + "}}");\n  }\n}).catch(function (error) {\n  console.log("Unable to retrieve templates. Error: " + error);\n});\n\napp.set("views", _path2.default.join(__dirname, "" + viewsDir));\napp.engine("hbs", hbs.engine);\napp.set("view engine", "hbs");\n\n// setup server for static assets\napp.use("/", _express2.default.static(_path2.default.join(__dirname, "dist"), { maxAge: 604800000 }));\n\n// https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625\napp.use("/.well-known", _express2.default.static(_path2.default.join(__dirname, ".well-known")));\n\n// require HTTPS\napp.use(_routing.requireHttps);\n\n// redirect to include www\napp.use(_routing.requireWww);\n\n// Setup body parser for parsing POST request bodies\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\n\nvar sessionExpiration = 20 * 60 * 1000; // 20 minutes\n\n// Setup session middleware\napp.use((0, _expressSession2.default)({\n  secret: "test",\n  cookie: { maxAge: sessionExpiration },\n  unset: "destroy",\n  resave: true,\n  saveUninitialized: false,\n  sameSite: true\n}));\n\n// React-Redux middleware\napp.use(_server2.handleRender);\n\n// use the environment\'s port or a random port\nvar port = process.env.port || ( true ? 3000 : Math.floor(Math.random() * 65535) + 1024);\n\nvar currentApp = app;\n\napp.listen(port, function () {\n  console.log("Running " + config.environment + " on localhost:" + port);\n});\n\nif (config.isHttps) {\n  var options = {\n    key: _fs2.default.readFileSync("server.key"),\n    cert: _fs2.default.readFileSync("server.crt"),\n    requestCert: false,\n    rejectUnauthorized: false\n  };\n\n  // create a different random port for HTTPS\n  var httpsPort = Math.floor(Math.random() * 65535) + 1024;\n  while (httpsPort === port) {\n    httpsPort = Math.floor(Math.random() * 65535) + 1024;\n  }\n\n  var _server = _https2.default.createServer(options, app).listen(httpsPort, function () {\n    console.log("HTTPS server started at port " + httpsPort);\n  });\n}\n\nif (true) {\n  module.hot.accept("./app.js", function () {\n    server.removeListener("request", currentApp);\n    server.on("request", app);\n    currentApp = app;\n  });\n}\n\nmodule.exports = app;\n/* WEBPACK VAR INJECTION */}.call(exports, ""))\n\n//////////////////\n// WEBPACK FOOTER\n// ./app.babel.js\n// module id = ./app.babel.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./app.babel.js?'
      );

      /***/
    },

    /***/ /***/ "./server/helpers/pathConfig.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.defaultPathConfig = exports.getFileContents = undefined;\n\nvar _fs = __webpack_require__("fs");\n\nvar _fs2 = _interopRequireDefault(_fs);\n\nvar _path = __webpack_require__("path");\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// retrieves the contents from a file on the file system\nvar getFileContents = exports.getFileContents = function getFileContents(files) {\n  var folder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";\n\n  // concat inline styles for document <head>\n  var flattenedContents = "";\n  files.forEach(function (file) {\n    flattenedContents += _fs2.default.readFileSync(_path2.default.resolve(__dirname) + folder + file);\n  });\n  return flattenedContents;\n};\n\nvar defaultPathConfig = exports.defaultPathConfig = {\n  view: "index",\n  inlineStyles: getFileContents(["/inline.css"], "/../../" + "dist"),\n  remoteStyles: ["https://fonts.googleapis.com/css?family=Roboto:400,700", "/style.css", "/vendor.css"],\n  vendorScripts: ["/vendor.js"],\n  remoteScripts: ["/main.js"]\n};\n/* WEBPACK VAR INJECTION */}.call(exports, "server\\\\helpers"))\n\n//////////////////\n// WEBPACK FOOTER\n// ./server/helpers/pathConfig.js\n// module id = ./server/helpers/pathConfig.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server/helpers/pathConfig.js?'
      );

      /***/
    },

    /***/ /***/ "./server/helpers/routing.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.requireHttps = requireHttps;\nexports.requireWww = requireWww;\n// permanent redirect http requests\nfunction requireHttps(req, res, next) {\n  if (/^localhost$/.test(req.hostname)) {\n    // skip if localhost\n    return next();\n  } else if (req.secure) {\n    // if already on HTTPS\n    return next();\n  } else if (req.get("x-arr-ssl")) {\n    // https://coderead.wordpress.com/2014/09/05/redirecting-to-https-in-node-js-on-azure-websites/\n    return next();\n  } else {\n    return res.redirect(301, req.protocol + "s" + "://" + req.headers.host + req.url);\n  }\n}\n\n// permanent redirect to include www\nfunction requireWww(req, res, next) {\n  if (/^localhost$/.test(req.hostname)) {\n    // skip if localhost\n    return next();\n  } else if (/\\.azurewebsites.net$/.test(req.hostname)) {\n    // skip if azurewebsites\n    return next();\n  } else if (/^www\\./i.test(req.headers.host)) {\n    // www. already there\n    return next();\n  } else {\n    return res.redirect(301, req.protocol + "://www." + req.headers.host + req.url);\n  }\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./server/helpers/routing.js\n// module id = ./server/helpers/routing.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server/helpers/routing.js?'
      );

      /***/
    },

    /***/ /***/ "./server/server.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.handleRender = handleRender;\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _server = __webpack_require__("react-dom/server");\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _store = __webpack_require__("./src/js/util/store.js");\n\nvar _index = __webpack_require__("./src/js/containers/routes/index.jsx");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _pathConfig = __webpack_require__("./server/helpers/pathConfig.js");\n\nvar _index3 = __webpack_require__("./src/js/containers/header/index.jsx");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _index5 = __webpack_require__("./src/js/containers/page/index.jsx");\n\nvar _index6 = _interopRequireDefault(_index5);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/*\r\n * Root component on the server-side\r\n */\nfunction handleRender(req, res) {\n  // Create a new Redux store instance\n  var store = (0, _store.configureStore)();\n  var params = req.params,\n      path = req.path,\n      url = req.url,\n      query = req.query;\n\n\n  _index2.default.fetchData(store).then(function (routes) {\n    // retrieve data for all components on the current route\n    var promises = [];\n\n    var match = routes.some(function (route) {\n      if ((0, _reactRouterDom.matchPath)(req.path, {\n        path: route.url,\n        exact: true\n      })) {\n        // GET routes\n        var component = (0, _index.getRouteComponent)(route.name);\n        // inject the reducer for the route\n\n        var _component$getReducer = component.getReducer(),\n            key = _component$getReducer.key,\n            reducer = _component$getReducer.reducer;\n\n        (0, _store.injectReducer)(store, key, reducer);\n        // add the promise to fetch the route data\n        promises.push(component.fetchData(store, { params: params, path: path, url: url, query: query }));\n        return true;\n      }\n    });\n\n    // handle 404\n    if (!match) {\n      var _Page$getReducer = _index6.default.getReducer(),\n          key = _Page$getReducer.key,\n          reducer = _Page$getReducer.reducer;\n\n      (0, _store.injectReducer)(store, key, reducer);\n      promises.push(_index6.default.fetchData(store, { path: "/page-not-found" }));\n      req.show404 = true;\n    }\n\n    if (_index4.default) {\n      var _Header$getReducer = _index4.default.getReducer(),\n          _key = _Header$getReducer.key,\n          _reducer = _Header$getReducer.reducer;\n\n      (0, _store.injectReducer)(store, _key, _reducer);\n      promises.push(_index4.default.fetchData(store, { path: path }));\n    }\n\n    Promise.all(promises).then(function (response) {\n      var staticContext = {};\n\n      // render the component to a string\n      var html = (0, _server.renderToString)(_react2.default.createElement(\n        _reactRedux.Provider,\n        { store: store },\n        _react2.default.createElement(\n          "div",\n          { id: "app" },\n          _react2.default.createElement(\n            _reactRouterDom.StaticRouter,\n            { context: staticContext, location: req.url },\n            _react2.default.createElement(_index2.default, { routes: routes })\n          )\n        )\n      ));\n\n      // Grab the initial state from our Redux store\n      var preloadedState = store.getState();\n\n      var data = Object.assign(_pathConfig.defaultPathConfig, {\n        html: html,\n        preloadedState: JSON.stringify(preloadedState.toJS()).replace(/</g, "\\\\u003c")\n      });\n\n      // Send the rendered page back to the client using the server\'s view engine\n      if (req.show500) {\n        res.status(500);\n        res.render("500", { layout: false });\n      } else {\n        if (req.show404) {\n          res.status(404);\n        }\n        res.render("index", { data: data });\n      }\n    }).catch(function (error) {\n      console.error(error);\n      throw error;\n    });\n  }).catch(function (error) {\n    console.error(error);\n    throw error;\n  });\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./server/server.js\n// module id = ./server/server.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./server/server.js?'
      );

      /***/
    },

    /***/ /***/ "./service/nav.json": function(module, exports) {
      eval(
        'module.exports = {"name":"Home","url":"/","icon":"/img/ic_dashboard_black_24px.svg","isActive":false,"children":[{"name":"Settings","url":"/settings","icon":"/img/ic_settings_black_24px.svg","isActive":false,"children":[]}]}\n\n//////////////////\n// WEBPACK FOOTER\n// ./service/nav.json\n// module id = ./service/nav.json\n// module chunks = 0\n\n//# sourceURL=webpack:///./service/nav.json?'
      );

      /***/
    },

    /***/ /***/ "./service/pages.json": function(module, exports) {
      eval(
        'module.exports = {"/":{"name":"Home","meta":{"title":"React PWA"},"title":"Delight","images":[],"buttons":[{"url":"/settings","title":"Settings"}],"html":"<p>Delight is a PWA under development</p>","url":"/"},"/settings":{"name":"Settings","meta":{"title":"Settings"},"title":"Settings","html":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>","url":"/settings"},"/page-not-found":{"name":"Page","meta":{"title":"Page Not Found"},"title":"Page Not Found","html":"<p>The page you were looking for could not be found. Please contact an administrator.</p>","url":"/page-not-found"}}\n\n//////////////////\n// WEBPACK FOOTER\n// ./service/pages.json\n// module id = ./service/pages.json\n// module chunks = 0\n\n//# sourceURL=webpack:///./service/pages.json?'
      );

      /***/
    },

    /***/ /***/ "./service/service.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getRouteData = exports.getHeaderData = exports.getPageData = undefined;\n\nvar _pages = __webpack_require__("./service/pages.json");\n\nvar _pages2 = _interopRequireDefault(_pages);\n\nvar _nav = __webpack_require__("./service/nav.json");\n\nvar _nav2 = _interopRequireDefault(_nav);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar getPageData = exports.getPageData = function getPageData(urlPath) {\n  return Promise.resolve(_pages2.default[urlPath]);\n};\n\nvar getHeaderData = exports.getHeaderData = function getHeaderData(urlPath) {\n  return Promise.resolve(_nav2.default);\n};\n\nvar getRouteData = exports.getRouteData = function getRouteData(urlPath) {\n  return Promise.resolve(Object.keys(_pages2.default).map(function (n) {\n    return _pages2.default[n];\n  }));\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./service/service.js\n// module id = ./service/service.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./service/service.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/card/card.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Card = function Card(_ref) {\n  var title = _ref.title,\n      html = _ref.html,\n      buttons = _ref.buttons;\n\n  return _react2.default.createElement(\n    "section",\n    { className: "richtext card" },\n    _react2.default.createElement(\n      "div",\n      { className: "card-title" },\n      _react2.default.createElement(\n        "h1",\n        null,\n        title\n      )\n    ),\n    _react2.default.createElement("div", {\n      className: "card-content",\n      dangerouslySetInnerHTML: { __html: html }\n    }),\n    buttons && _react2.default.createElement(\n      "div",\n      { className: "card-buttons" },\n      buttons.map(function (n, index) {\n        return _react2.default.createElement(\n          _reactRouterDom.Link,\n          {\n            to: n.url,\n            key: index,\n            href: n.url,\n            className: "button",\n            title: n.title\n          },\n          n.title\n        );\n      })\n    )\n  );\n};\n\nCard.propTypes = {\n  title: _propTypes2.default.string,\n  html: _propTypes2.default.string,\n  buttons: _propTypes2.default.array\n};\n\nexports.default = Card;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/card/card.jsx\n// module id = ./src/js/components/card/card.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/card/card.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/meta/meta.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactHelmet = __webpack_require__("react-helmet");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Meta = function Meta(_ref) {\n  var meta = _ref.meta,\n      url = _ref.url;\n\n  var ogImage = _react2.default.createElement("meta", { property: "og:image", content: "/img/logo.jpg" });\n\n  var imageSrc = _react2.default.createElement("link", { rel: "image_src", href: "/img/logo.jpg" });\n\n  if (meta.thumbnail) {\n    ogImage = _react2.default.createElement("meta", { property: "og:image", content: meta.thumbnail });\n    imageSrc = _react2.default.createElement("link", { rel: "image_src", href: meta.thumbnail });\n  }\n\n  return _react2.default.createElement(\n    _reactHelmet.Helmet,\n    null,\n    _react2.default.createElement(\n      "title",\n      null,\n      meta.title\n    ),\n    _react2.default.createElement("meta", { name: "description", content: meta.description }),\n    _react2.default.createElement("meta", { name: "keywords", content: meta.keywords }),\n    _react2.default.createElement("meta", { property: "og:title", content: meta.title }),\n    _react2.default.createElement("link", { rel: "canonical", value: url }),\n    ogImage,\n    imageSrc\n  );\n};\n\nMeta.propTypes = {\n  meta: _propTypes2.default.shape({\n    title: _propTypes2.default.string,\n    description: _propTypes2.default.string,\n    keywords: _propTypes2.default.string,\n    thumbnail: _propTypes2.default.string\n  }).isRequired,\n  url: _propTypes2.default.string\n};\n\nexports.default = Meta;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/meta/meta.jsx\n// module id = ./src/js/components/meta/meta.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/meta/meta.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/nav/nav.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _modernizr = __webpack_require__("modernizr");\n\nvar _modernizr2 = _interopRequireDefault(_modernizr);\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _util = __webpack_require__("./src/js/util/util.js");\n\nvar _overlay = __webpack_require__("./src/js/components/nav/overlay.jsx");\n\nvar _overlay2 = _interopRequireDefault(_overlay);\n\nvar _navTree = __webpack_require__("./src/js/components/nav/navTree.jsx");\n\nvar _navTree2 = _interopRequireDefault(_navTree);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar menuQueryItem = "_nav";\nvar swipeSlope = 3; // reciprocal of the swipe slope (1 means 45 deg, 5 means approx 11 deg)\n\n// This extends PureComponent instead of functional component because we use ref\n\nvar Nav = function (_React$PureComponent) {\n  _inherits(Nav, _React$PureComponent);\n\n  function Nav(props) {\n    _classCallCheck(this, Nav);\n\n    var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));\n\n    var _this$props = _this.props,\n        history = _this$props.history,\n        onSetNavItemActive = _this$props.onSetNavItemActive;\n\n\n    history.listen(function (location, action) {\n      onSetNavItemActive({\n        href: location.pathname\n      });\n    });\n\n    _this.onLinkClick = _this.onLinkClick.bind(_this);\n    _this.toggle = _this.toggle.bind(_this);\n    _this.updateHistory = _this.updateHistory.bind(_this);\n    _this.updateSlide = _this.updateSlide.bind(_this);\n    return _this;\n  }\n\n  _createClass(Nav, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      this.init();\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var _this2 = this;\n\n      var nav = this.props.nav;\n\n\n      return _react2.default.createElement(\n        "div",\n        null,\n        _react2.default.createElement(\n          "nav",\n          { className: "nav-menu checkbox" },\n          _react2.default.createElement(\n            "div",\n            { className: "hamburger" },\n            _react2.default.createElement("input", {\n              type: "checkbox",\n              id: "hamburger",\n              ref: function ref(n) {\n                return _this2.element = n;\n              }\n            }),\n            _react2.default.createElement(\n              "label",\n              { htmlFor: "hamburger" },\n              "Toggle Menu"\n            ),\n            _react2.default.createElement(\n              "div",\n              {\n                className: "side-nav always-open-on-desktop",\n                ref: function ref(n) {\n                  return _this2.sideBarEl = n;\n                }\n              },\n              _react2.default.createElement("div", { className: "nav-header" }),\n              _react2.default.createElement(\n                "div",\n                { className: "nav-body" },\n                _react2.default.createElement(\n                  "div",\n                  { className: "section" },\n                  _react2.default.createElement(_navTree2.default, {\n                    nav: nav,\n                    onLinkClick: function onLinkClick(e) {\n                      _this2.onLinkClick();\n                      return true;\n                    }\n                  })\n                )\n              )\n            )\n          )\n        ),\n        _react2.default.createElement(_overlay2.default, { ref: function ref(n) {\n            return _this2.overlay = n;\n          } })\n      );\n    }\n  }, {\n    key: "init",\n    value: function init() {\n      var self = this;\n      self.isVisible = false;\n      self.startX = 0;\n      self.currentX = 0;\n      self.touchingSideNav = false;\n\n      self.element.addEventListener("click", function (e) {\n        // toggle the overlay on click of the burger icon\n        self.toggle();\n      });\n\n      self.overlay.addEventListener("click", function (e) {\n        self.toggle();\n      });\n\n      // handle touch gestures to allow swipe out\n      var touchX = 0;\n      var touchY = 0;\n\n      document.body.addEventListener("touchstart", function (event) {\n        if (!self.isVisible) {\n          // slide out\n          touchX = event.changedTouches[0].clientX;\n          touchY = event.changedTouches[0].clientY;\n        } else {\n          // slide in/slide animation\n          self.startX = event.touches[0].pageX;\n          self.currentX = self.startX;\n          self.touchingSideNav = true;\n          self.sideBarEl.classList.add("touching");\n          requestAnimationFrame(function () {\n            self.updateSlide(self);\n          });\n        }\n      }, _modernizr2.default.passiveeventlisteners ? { passive: true } : false);\n\n      document.body.addEventListener("touchmove", function (event) {\n        if (!self.touchingSideNav) {\n          return;\n        }\n        self.currentX = event.touches[0].pageX;\n      }, _modernizr2.default.passiveeventlisteners ? { passive: true } : false);\n\n      document.body.addEventListener("touchend", function (event) {\n        if (!self.isVisible) {\n          if (self.element.parentElement.parentElement.offsetParent) {\n            // calculate the difference\n            var x = Math.abs(event.changedTouches[0].clientX) - Math.abs(touchX);\n            var y = Math.abs(event.changedTouches[0].clientY) - Math.abs(touchY);\n\n            if (Math.abs(x) > swipeSlope * Math.abs(y) && x > 80 && 4 * Math.abs(touchX) < window.innerWidth) {\n              // swiped right\n              self.toggle();\n            }\n          }\n        } else {\n          if (!self.touchingSideNav) {\n            return;\n          }\n          self.touchingSideNav = false;\n          self.sideBarEl.classList.remove("touching");\n\n          var translateX = Math.min(0, self.currentX - self.startX);\n          self.sideBarEl.style.transform = "";\n\n          // user slided left by more than 1/3 the width of the sidebar\n          if (translateX + self.sideBarEl.clientWidth / 3 < 0) {\n            self.toggle();\n          }\n        }\n      }, _modernizr2.default.passiveeventlisteners ? { passive: true } : false);\n\n      window.onpopstate = function (event) {\n        // user pressed back/forward button\n        if (!(0, _util.getParameterByName)(menuQueryItem, location.search) && self.isVisible) {\n          // hide\n          self.toggle(true);\n        } else if ((0, _util.getParameterByName)(menuQueryItem, location.search) && !self.isVisible) {\n          // show\n          self.toggle(true);\n        }\n      };\n\n      // remove query string params if visible\n      window.history.replaceState(null, "", window.location.pathname + (0, _util.removeQueryParameter)(location.search, menuQueryItem));\n    }\n  }, {\n    key: "onLinkClick",\n    value: function onLinkClick() {\n      var self = this;\n      // reset the menu\n      self.toggle(true);\n\n      // continue event propagation\n      return true;\n    }\n  }, {\n    key: "updateSlide",\n    value: function updateSlide(self) {\n      if (!self.touchingSideNav) {\n        return;\n      }\n      requestAnimationFrame(function () {\n        self.updateSlide(self);\n      });\n\n      var translateX = Math.min(0, self.currentX - self.startX);\n      self.sideBarEl.style.transform = "translateX(" + translateX + "px)";\n    }\n  }, {\n    key: "updateHistory",\n    value: function updateHistory() {\n      if (!this.isVisible) {\n        // hide\n        window.history.back();\n      } else {\n        // show\n        window.history.pushState(null, "", (0, _util.updateQueryStringParameter)(location.search, menuQueryItem, "1"));\n      }\n    }\n\n    // toggle the overlay and the state of the navigation\n\n  }, {\n    key: "toggle",\n    value: function toggle(isFromHistory) {\n      var self = this;\n      self.isVisible = !self.isVisible;\n\n      if (self.isVisible) {\n        self.element.checked = true;\n      } else {\n        self.element.checked = false;\n      }\n\n      if (self.isVisible) {\n        self.overlay.setVisible(true);\n        document.body.style.overflowY = "hidden";\n      } else {\n        // delay hiding the element to show animation\n        setTimeout(function () {\n          self.overlay.setVisible(false);\n          document.body.style.overflowY = "visible";\n        }, 300);\n      }\n\n      self.overlay.toggle();\n\n      if (!isFromHistory) {\n        self.updateHistory();\n      }\n    }\n  }]);\n\n  return Nav;\n}(_react2.default.PureComponent);\n\n// type-checking\n\n\nNav.propTypes = {\n  nav: _propTypes2.default.object.isRequired\n};\n\nexports.default = (0, _reactRouterDom.withRouter)(Nav);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/nav/nav.jsx\n// module id = ./src/js/components/nav/nav.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/nav/nav.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/nav/navTree.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _navTreeItem = __webpack_require__("./src/js/components/nav/navTreeItem.jsx");\n\nvar _navTreeItem2 = _interopRequireDefault(_navTreeItem);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar NavTree = function NavTree(_ref) {\n  var nav = _ref.nav,\n      onLinkClick = _ref.onLinkClick;\n\n  var children = [];\n  if (nav.children) {\n    children = nav.children.map(function (item, index) {\n      return _react2.default.createElement(\n        "li",\n        { className: "item", key: index },\n        _react2.default.createElement(_navTreeItem2.default, {\n          name: item.name,\n          url: item.url,\n          icon: item.icon,\n          isActive: item.isActive,\n          onClick: onLinkClick\n        })\n      );\n    });\n  }\n\n  return _react2.default.createElement(\n    "ul",\n    { className: "page-list" },\n    _react2.default.createElement(\n      "li",\n      null,\n      _react2.default.createElement(_navTreeItem2.default, {\n        name: nav.name,\n        url: nav.url,\n        icon: nav.icon,\n        isActive: nav.isActive,\n        onClick: onLinkClick\n      })\n    ),\n    children\n  );\n};\n\nNavTree.propTypes = {\n  nav: _propTypes2.default.shape({\n    name: _propTypes2.default.string.isRequired,\n    url: _propTypes2.default.string.isRequired,\n    icon: _propTypes2.default.string.isRequired,\n    isActive: _propTypes2.default.bool.isRequired,\n    children: _propTypes2.default.array.isRequired\n  }).isRequired\n};\n\nexports.default = NavTree;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/nav/navTree.jsx\n// module id = ./src/js/components/nav/navTree.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/nav/navTree.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/nav/navTreeItem.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar NavTreeItem = function NavTreeItem(_ref) {\n  var url = _ref.url,\n      name = _ref.name,\n      icon = _ref.icon,\n      isActive = _ref.isActive,\n      onClick = _ref.onClick;\n\n  var className = isActive ? "selected" : "";\n  return _react2.default.createElement(\n    _reactRouterDom.Link,\n    { to: url, title: name, className: className, onClick: onClick },\n    _react2.default.createElement(\n      "i",\n      { className: "icon" },\n      icon && _react2.default.createElement("img", { src: icon, alt: name })\n    ),\n    name\n  );\n};\n\nNavTreeItem.propTypes = {\n  name: _propTypes2.default.string.isRequired,\n  url: _propTypes2.default.string.isRequired,\n  icon: _propTypes2.default.string,\n  isActive: _propTypes2.default.bool.isRequired\n};\n\nexports.default = NavTreeItem;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/nav/navTreeItem.jsx\n// module id = ./src/js/components/nav/navTreeItem.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/nav/navTreeItem.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/nav/overlay.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// This extends PureComponent instead of functional component because we use ref\nvar Overlay = function (_React$PureComponent) {\n  _inherits(Overlay, _React$PureComponent);\n\n  function Overlay(props) {\n    _classCallCheck(this, Overlay);\n\n    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));\n\n    _this.addEventListener = _this.addEventListener.bind(_this);\n    _this.setVisible = _this.setVisible.bind(_this);\n    _this.toggle = _this.toggle.bind(_this);\n    return _this;\n  }\n\n  _createClass(Overlay, [{\n    key: "addEventListener",\n    value: function addEventListener(event, callback) {\n      this.element.addEventListener(event, function (e) {\n        callback(e);\n      });\n    }\n  }, {\n    key: "setVisible",\n    value: function setVisible(isVisible) {\n      if (isVisible) {\n        this.element.classList.remove("hidden");\n      } else {\n        this.element.classList.add("hidden");\n      }\n    }\n  }, {\n    key: "toggle",\n    value: function toggle() {\n      // toggle the class \'visible\'\n      var className = "visible";\n      if (this.element.classList) {\n        this.element.classList.toggle(className);\n      } else {\n        var classes = this.element.className.split(" ");\n        var existingIndex = classes.indexOf(className);\n\n        if (existingIndex >= 0) {\n          classes.splice(existingIndex, 1);\n        } else {\n          classes.push(className);\n        }\n\n        this.element.className = classes.join(" ");\n      }\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement("div", {\n        id: "overlay",\n        className: "modal-overlay hidden",\n        ref: function ref(n) {\n          return _this2.element = n;\n        }\n      });\n    }\n  }]);\n\n  return Overlay;\n}(_react2.default.PureComponent);\n\nexports.default = Overlay;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/nav/overlay.jsx\n// module id = ./src/js/components/nav/overlay.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/nav/overlay.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/push/push.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _toggle = __webpack_require__("./src/js/components/toggle/toggle.jsx");\n\nvar _toggle2 = _interopRequireDefault(_toggle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar PushNotificationToggle = function (_React$PureComponent) {\n  _inherits(PushNotificationToggle, _React$PureComponent);\n\n  function PushNotificationToggle(props) {\n    _classCallCheck(this, PushNotificationToggle);\n\n    var _this = _possibleConstructorReturn(this, (PushNotificationToggle.__proto__ || Object.getPrototypeOf(PushNotificationToggle)).call(this, props));\n\n    _this.handleChange = _this.handleChange.bind(_this);\n\n    _this.state = {\n      isEnabled: false\n    };\n    return _this;\n  }\n\n  _createClass(PushNotificationToggle, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      var onSetPushEnabled = this.props.onSetPushEnabled;\n\n\n      if (!("serviceWorker" in navigator)) {\n        console.warn("Notifications aren\'t supported.");\n        return;\n      }\n\n      if (!("showNotification" in ServiceWorkerRegistration.prototype)) {\n        console.warn("Notifications aren\'t supported.");\n        return;\n      }\n\n      // Check if push messaging is supported\n      if (!("PushManager" in window)) {\n        console.warn("Push messaging isn\'t supported.");\n        return;\n      }\n\n      // if its denied, it\'s a permanent block until the user changes the permission\n      if (Notification.permission === "denied") {\n        console.warn("The user has blocked notifications.");\n        return;\n      }\n\n      // we need the service worker registration to check for a subscription\n      navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {\n        // do we already have a push message subscription?\n        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {\n          if (!subscription) {\n            return;\n          }\n          onSetPushEnabled(true);\n        }).catch(function (err) {\n          console.warn("Error during getSubscription()", err);\n        });\n      });\n\n      this.setState({ isEnabled: true });\n    }\n  }, {\n    key: "handleChange",\n    value: function handleChange(e) {\n      var _this2 = this;\n\n      var onSetPushEnabled = this.props.onSetPushEnabled;\n\n\n      if (e.target.checked) {\n        // enable push\n        subscribe().then(function (response) {\n          onSetPushEnabled(response);\n          if (!response) {\n            _this2.setState({ isEnabled: false });\n          }\n        });\n      } else {\n        // disable push\n        unsubscribe().then(function (response) {\n          onSetPushEnabled(!response);\n        });\n      }\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var isPushEnabled = this.props.isPushEnabled;\n\n      return _react2.default.createElement(_toggle2.default, _extends({}, this.props, {\n        checked: isPushEnabled,\n        disabled: !this.state.isEnabled,\n        onChange: this.handleChange\n      }));\n    }\n  }]);\n\n  return PushNotificationToggle;\n}(_react2.default.PureComponent);\n\nvar subscribe = function subscribe() {\n  return new Promise(function (resolve, reject) {\n    if (Notification.permission === "denied") {\n      return reject(new Error("Push messages are blocked."));\n    }\n\n    if (Notification.permission === "granted") {\n      return resolve(true);\n    }\n\n    if (Notification.permission === "default") {\n      Notification.requestPermission(function (result) {\n        if (result !== "granted") {\n          resolve(false);\n        }\n        resolve(true);\n      });\n    }\n  }).then(function () {\n    // We need the service worker registration to access the push manager\n    return navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {\n      return serviceWorkerRegistration.pushManager.subscribe({\n        userVisibleOnly: true\n      });\n    }).then(function (subscription) {\n      if (subscription.endpoint.indexOf("https://android.googleapis.com/gcm/send") === 0) {\n        var endpointParts = subscription.endpoint.split("/");\n        var registrationId = endpointParts[endpointParts.length - 1];\n        // TODO: add to notification hub\n      }\n      // user has subscribed successfully\n      return true;\n    }).catch(function (e) {\n      console.warn(e);\n      return false;\n    });\n  }).catch(function (e) {\n    // permission prompt issue\n    console.warn(e);\n    return false;\n  });\n};\n\nvar unsubscribe = function unsubscribe() {\n  return navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {\n    // to unsubscribe from push messaging, you need get the subscription object, which you can call unsubscribe() on.\n    return serviceWorkerRegistration.pushManager.getSubscription().then(function (pushSubscription) {\n      // check we have a subscription to unsubscribe\n      if (!pushSubscription) {\n        // no subscription object, so set the state to allow the user to subscribe to push\n        return false;\n      }\n\n      // we have a subscription, so call unsubscribe on it\n      return pushSubscription.unsubscribe().then(function (successful) {\n        return true;\n      }).catch(function (e) {\n        // we failed to unsubscribe, this can lead to an unusual state, so may be best to remove the users data from your data store and inform the user that you have done so\n        console.warn("Unsubscription error: ", e);\n      });\n    }).catch(function (e) {\n      console.error("Error thrown while unsubscribing from push messaging.", e);\n    });\n  });\n};\n\nexports.default = PushNotificationToggle;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/push/push.jsx\n// module id = ./src/js/components/push/push.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/push/push.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/routes/scrollToTop.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ScrollToTop = function (_React$PureComponent) {\n  _inherits(ScrollToTop, _React$PureComponent);\n\n  function ScrollToTop() {\n    _classCallCheck(this, ScrollToTop);\n\n    return _possibleConstructorReturn(this, (ScrollToTop.__proto__ || Object.getPrototypeOf(ScrollToTop)).apply(this, arguments));\n  }\n\n  _createClass(ScrollToTop, [{\n    key: "componentDidUpdate",\n    value: function componentDidUpdate(prevProps) {\n      if (this.props.location !== prevProps.location) {\n        window.scrollTo(0, 0);\n      }\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      return this.props.children;\n    }\n  }]);\n\n  return ScrollToTop;\n}(_react2.default.PureComponent);\n\nexports.default = (0, _reactRouterDom.withRouter)(ScrollToTop);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/routes/scrollToTop.jsx\n// module id = ./src/js/components/routes/scrollToTop.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/routes/scrollToTop.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/toggle/toggle.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Toggle = function Toggle(_ref) {\n  var id = _ref.id,\n      title = _ref.title,\n      html = _ref.html,\n      onChange = _ref.onChange,\n      disabled = _ref.disabled,\n      checked = _ref.checked;\n\n  return _react2.default.createElement(\n    "label",\n    { htmlFor: id },\n    _react2.default.createElement(\n      "span",\n      { className: "title" },\n      title\n    ),\n    _react2.default.createElement("div", {\n      className: "toggle-description",\n      dangerouslySetInnerHTML: { __html: html }\n    }),\n    _react2.default.createElement(\n      "div",\n      { className: "input toggle-input" },\n      _react2.default.createElement("input", {\n        type: "checkbox",\n        id: id,\n        onChange: onChange,\n        disabled: disabled,\n        checked: checked\n      }),\n      _react2.default.createElement("span", { className: "switch" }),\n      _react2.default.createElement(\n        "span",\n        { className: "toggle" },\n        "\\xA0"\n      )\n    )\n  );\n};\n\nToggle.propTypes = {\n  title: _propTypes2.default.string,\n  html: _propTypes2.default.string\n};\n\nexports.default = Toggle;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/toggle/toggle.jsx\n// module id = ./src/js/components/toggle/toggle.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/toggle/toggle.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/components/transitions/fade.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.FadeTransition = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactTransitionGroup = __webpack_require__("react-transition-group");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar FadeTransition = function FadeTransition(_ref) {\n  var children = _ref.children,\n      props = _objectWithoutProperties(_ref, ["children"]);\n\n  return _react2.default.createElement(\n    _reactTransitionGroup.CSSTransition,\n    _extends({}, props, { timeout: 200, classNames: "fade" }),\n    children\n  );\n};\n\nexports.FadeTransition = FadeTransition;\nexports.default = FadeTransition;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/components/transitions/fade.jsx\n// module id = ./src/js/components/transitions/fade.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/components/transitions/fade.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/a2hs/a2hs.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _actions = __webpack_require__("./src/js/containers/app/actions.js");\n\nvar _reducer = __webpack_require__("./src/js/containers/app/reducer.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AddToHomeScreen = function (_React$PureComponent) {\n  _inherits(AddToHomeScreen, _React$PureComponent);\n\n  function AddToHomeScreen() {\n    _classCallCheck(this, AddToHomeScreen);\n\n    return _possibleConstructorReturn(this, (AddToHomeScreen.__proto__ || Object.getPrototypeOf(AddToHomeScreen)).apply(this, arguments));\n  }\n\n  _createClass(AddToHomeScreen, [{\n    key: "render",\n    value: function render() {\n      var _props = this.props,\n          children = _props.children,\n          deferredPrompt = _props.deferredPrompt,\n          onSetDeferredPrompt = _props.onSetDeferredPrompt,\n          className = _props.className,\n          props = _objectWithoutProperties(_props, ["children", "deferredPrompt", "onSetDeferredPrompt", "className"]);\n\n      return _react2.default.createElement(\n        "a",\n        _extends({}, props, {\n          className: (className || "") + (!deferredPrompt ? " disabled" : ""),\n          onClick: function onClick(e) {\n            e.preventDefault();\n\n            // if the prompt has been deferred, we are able to show it\n            deferredPrompt.prompt();\n\n            // follow what the user has done with the prompt.\n            deferredPrompt.userChoice.then(function (choiceResult) {\n              // dispose the prompt\n              onSetDeferredPrompt(null);\n            });\n          }\n        }),\n        children\n      );\n    }\n  }]);\n\n  return AddToHomeScreen;\n}(_react2.default.PureComponent);\n\n// maps the redux store state to the props related to the data from the store\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return { deferredPrompt: (0, _reducer.getAppState)(state).toJS().deferredPrompt };\n};\n\n// specifies the behaviour, which callback prop dispatches which action\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    onSetDeferredPrompt: function onSetDeferredPrompt(data) {\n      return dispatch((0, _actions.setDeferredPrompt)(data));\n    }\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddToHomeScreen);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/a2hs/a2hs.jsx\n// module id = ./src/js/containers/a2hs/a2hs.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/a2hs/a2hs.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/app/actions.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.setMeta = exports.setUrl = exports.setTitle = exports.setDeferredPrompt = exports.isError = exports.isLoading = undefined;\n\nvar _constants = __webpack_require__("./src/js/containers/app/constants.js");\n\nvar isLoading = exports.isLoading = function isLoading(data) {\n  return {\n    type: _constants.APP_LOADING,\n    data: data\n  };\n};\n\nvar isError = exports.isError = function isError(data) {\n  return {\n    type: _constants.APP_ERROR\n  };\n};\n\nvar setDeferredPrompt = exports.setDeferredPrompt = function setDeferredPrompt(data) {\n  return {\n    type: _constants.SET_DEFERRED_PROMPT,\n    data: data\n  };\n};\n\nvar setTitle = exports.setTitle = function setTitle(data) {\n  return {\n    type: _constants.SET_TITLE,\n    data: data\n  };\n};\n\nvar setUrl = exports.setUrl = function setUrl(data) {\n  return {\n    type: _constants.SET_URL,\n    data: data\n  };\n};\n\nvar setMeta = exports.setMeta = function setMeta(data) {\n  return {\n    type: _constants.SET_META,\n    data: data\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/app/actions.js\n// module id = ./src/js/containers/app/actions.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/app/actions.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/app/constants.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar APP_LOADING = exports.APP_LOADING = "App/APP_LOADING";\nvar APP_ERROR = exports.APP_ERROR = "App/APP_ERROR";\nvar SET_DEFERRED_PROMPT = exports.SET_DEFERRED_PROMPT = "App/SET_DEFERRED_PROMPT";\nvar SET_META = exports.SET_META = "App/SET_META";\nvar SET_URL = exports.SET_URL = "App/SET_URL";\nvar SET_TITLE = exports.SET_TITLE = "App/SET_TITLE";\nvar REDUCER_NAME = exports.REDUCER_NAME = "app";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/app/constants.js\n// module id = ./src/js/containers/app/constants.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/app/constants.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/app/reducer.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.appReducer = appReducer;\nexports.getAppState = getAppState;\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _constants = __webpack_require__("./src/js/containers/app/constants.js");\n\nvar initialState = (0, _immutable.fromJS)({\n  deferredPrompt: null,\n  isLoading: false,\n  isError: false,\n  meta: {},\n  title: "",\n  url: ""\n});\n\nfunction appReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _constants.APP_LOADING:\n      return state.set("isLoading", action.data);\n    case _constants.APP_ERROR:\n      return state.set("isError", true);\n    case _constants.SET_DEFERRED_PROMPT:\n      return state.set("deferredPrompt", action.data);\n    case _constants.SET_META:\n      return state.set("meta", action.data);\n    case _constants.SET_TITLE:\n      return state.set("title", action.data);\n    case _constants.SET_URL:\n      return state.set("url", action.data);\n    default:\n      return state;\n  }\n}\n\nfunction getAppState(state) {\n  if (state.get(_constants.REDUCER_NAME)) {\n    return state.get(_constants.REDUCER_NAME);\n  } else {\n    return initialState;\n  }\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/app/reducer.js\n// module id = ./src/js/containers/app/reducer.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/app/reducer.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/footer/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Footer = function (_React$PureComponent) {\n  _inherits(Footer, _React$PureComponent);\n\n  function Footer() {\n    _classCallCheck(this, Footer);\n\n    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));\n  }\n\n  _createClass(Footer, [{\n    key: "render",\n    value: function render() {\n      return _react2.default.createElement(\n        "footer",\n        null,\n        _react2.default.createElement(\n          "div",\n          { className: "footer-wrapper" },\n          "Another PWA by Incredible Web"\n        )\n      );\n    }\n  }]);\n\n  return Footer;\n}(_react2.default.PureComponent);\n\nexports.default = Footer;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/footer/index.jsx\n// module id = ./src/js/containers/footer/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/footer/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/header/actions.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.fetchHeader = exports.setNavItemActive = undefined;\n\nvar _constants = __webpack_require__("./src/js/containers/header/constants.js");\n\nvar _service = __webpack_require__("./service/service.js");\n\nvar setNavItemActive = exports.setNavItemActive = function setNavItemActive(data) {\n  return {\n    type: _constants.SET_NAV_ITEM_ACTIVE,\n    data: data\n  };\n};\n\nvar loadHeader = function loadHeader(data) {\n  return {\n    type: _constants.SET_HEADER,\n    data: data\n  };\n};\n\nvar fetchHeader = exports.fetchHeader = function fetchHeader(data) {\n  return function (dispatch) {\n    return (0, _service.getHeaderData)(data).then(function (response) {\n      dispatch(loadHeader(response));\n    }).catch(function (error) {\n      console.error(error);\n      throw error;\n    });\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/header/actions.js\n// module id = ./src/js/containers/header/actions.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/header/actions.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/header/constants.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar SET_NAV_ITEM_ACTIVE = exports.SET_NAV_ITEM_ACTIVE = "Header/SET_NAV_ITEM_ACTIVE";\nvar SET_HEADER = exports.SET_HEADER = "Header/SET_HEADER";\nvar REDUCER_NAME = exports.REDUCER_NAME = "header";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/header/constants.js\n// module id = ./src/js/containers/header/constants.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/header/constants.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/header/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _reducerInjector = __webpack_require__("./src/js/util/reducerInjector.js");\n\nvar _reducerInjector2 = _interopRequireDefault(_reducerInjector);\n\nvar _nav = __webpack_require__("./src/js/components/nav/nav.jsx");\n\nvar _nav2 = _interopRequireDefault(_nav);\n\nvar _actions = __webpack_require__("./src/js/containers/header/actions.js");\n\nvar _constants = __webpack_require__("./src/js/containers/header/constants.js");\n\nvar _reducer = __webpack_require__("./src/js/containers/app/reducer.js");\n\nvar _reducer2 = __webpack_require__("./src/js/containers/header/reducer.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Header = function (_React$PureComponent) {\n  _inherits(Header, _React$PureComponent);\n\n  function Header() {\n    _classCallCheck(this, Header);\n\n    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));\n  }\n\n  _createClass(Header, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      var _props = this.props,\n          onLoadHeader = _props.onLoadHeader,\n          onSetNavItemActive = _props.onSetNavItemActive;\n\n      // set initial navigation item\n\n      onSetNavItemActive({\n        href: location.pathname\n      });\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var _props2 = this.props,\n          header = _props2.header,\n          title = _props2.title,\n          onSetNavItemActive = _props2.onSetNavItemActive;\n\n      return _react2.default.createElement(\n        "div",\n        null,\n        _react2.default.createElement(\n          "header",\n          { className: "fcds-navbar fcds-navbar--default fcds-navbar--fixed-top" },\n          _react2.default.createElement(\n            "section",\n            { className: "container fcds-navbar__container" },\n            _react2.default.createElement(\n              "section",\n              { className: "fcds-navbar__section hidden visible-xs" },\n              _react2.default.createElement(\n                "a",\n                {\n                  href: "#",\n                  className: "fcds-navbar__link fcds-navbar__link--trigger"\n                },\n                _react2.default.createElement(\n                  "span",\n                  { className: "icon icon--hamburger icon--md u-mr-xs" },\n                  _react2.default.createElement("span", { className: "hamburger" })\n                ),\n                _react2.default.createElement(\n                  "span",\n                  { className: "icon-label sr-only" },\n                  "Menu"\n                )\n              )\n            ),\n            _react2.default.createElement(\n              "section",\n              { className: "fcds-navbar__brand fcds-navbar__brand--center-bmd" },\n              _react2.default.createElement(\n                "a",\n                {\n                  href: "http://localhost:8000/#top",\n                  className: "fcds-navbar__brand-link"\n                },\n                _react2.default.createElement(\n                  "span",\n                  { className: "fcds-navbar__brand-wordmark hidden-xs" },\n                  "Delight"\n                )\n              )\n            ),\n            _react2.default.createElement(\n              "section",\n              { className: "fcds-navbar__section" },\n              _react2.default.createElement(\n                "li",\n                { className: "fcds-navbar__item" },\n                _react2.default.createElement(\n                  "a",\n                  {\n                    href: "http://localhost:8000/entry",\n                    className: "fcds-navbar__link"\n                  },\n                  "Carter V"\n                )\n              )\n            )\n          )\n        )\n      );\n    }\n  }], [{\n    key: "fetchData",\n    value: function fetchData(store, _ref) {\n      var path = _ref.path;\n\n      return store.dispatch((0, _actions.fetchHeader)(path));\n    }\n  }, {\n    key: "getReducer",\n    value: function getReducer() {\n      return { key: _constants.REDUCER_NAME, reducer: _reducer2.headerReducer };\n    }\n  }]);\n\n  return Header;\n}(_react2.default.PureComponent);\n\n// maps the redux store state to the props related to the data from the store\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  var header = (0, _reducer2.getHeaderState)(state).toJS();\n\n  var _getAppState$toJS = (0, _reducer.getAppState)(state).toJS(),\n      title = _getAppState$toJS.title;\n\n  return {\n    header: header,\n    title: title\n  };\n};\n\n// specifies the behaviour, which callback prop dispatches which action\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    onSetNavItemActive: function onSetNavItemActive(data) {\n      return dispatch((0, _actions.setNavItemActive)(data));\n    }\n  };\n};\n\n// inject a new reducer for this component\nvar withReducer = (0, _reducerInjector2.default)(_constants.REDUCER_NAME, _reducer2.headerReducer)(Header);\n\nexports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(withReducer));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/header/index.jsx\n// module id = ./src/js/containers/header/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/header/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/header/reducer.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getHeaderState = undefined;\nexports.headerReducer = headerReducer;\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _constants = __webpack_require__("./src/js/containers/header/constants.js");\n\nvar initialState = (0, _immutable.fromJS)({\n  nav: {\n    name: "",\n    url: "",\n    icon: "",\n    isActive: false,\n    children: []\n  }\n});\n\nfunction headerReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _constants.SET_NAV_ITEM_ACTIVE:\n      if (action.data.href === "/") {\n        // home page\n        return state.setIn(["nav", "isActive"], true).updateIn(["nav", "children"], function (n) {\n          return n.map(function (m) {\n            return m.set("isActive", false);\n          });\n        });\n      }\n      return state.setIn(["nav", "isActive"], false).updateIn(["nav", "children"], function (n) {\n        return n.map(function (m) {\n          return m.set("isActive", m.get("url") === action.data.href);\n        });\n      });\n    case _constants.SET_HEADER:\n      return state.set("nav", action.data);\n    default:\n      return state;\n  }\n}\n\nvar getHeaderState = exports.getHeaderState = function getHeaderState(state) {\n  if (state.get(_constants.REDUCER_NAME)) {\n    return state.get(_constants.REDUCER_NAME);\n  } else {\n    return initialState;\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/header/reducer.js\n// module id = ./src/js/containers/header/reducer.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/header/reducer.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/home/actions.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.fetchHome = undefined;\n\nvar _constants = __webpack_require__("./src/js/containers/home/constants.js");\n\nvar _actions = __webpack_require__("./src/js/containers/app/actions.js");\n\nvar _service = __webpack_require__("./service/service.js");\n\nvar loadHome = function loadHome(data) {\n  return {\n    type: _constants.SET_HOME,\n    data: data\n  };\n};\n\nvar fetchHome = exports.fetchHome = function fetchHome(data) {\n  return function (dispatch) {\n    dispatch((0, _actions.isLoading)(true));\n\n    return (0, _service.getPageData)(data).then(function (response) {\n      dispatch((0, _actions.setMeta)(response.meta));\n      dispatch((0, _actions.setUrl)(response.url));\n      dispatch((0, _actions.setTitle)(response.title));\n      return response;\n    }).then(function (response) {\n      dispatch((0, _actions.isLoading)(false));\n      dispatch(loadHome(response));\n    }).catch(function (error) {\n      console.error(error);\n      throw error;\n    });\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/home/actions.js\n// module id = ./src/js/containers/home/actions.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/home/actions.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/home/constants.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar SET_HOME = exports.SET_HOME = "Home/SET_HOME";\nvar REDUCER_NAME = exports.REDUCER_NAME = "home";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/home/constants.js\n// module id = ./src/js/containers/home/constants.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/home/constants.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/home/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _card = __webpack_require__("./src/js/components/card/card.jsx");\n\nvar _card2 = _interopRequireDefault(_card);\n\nvar _reducerInjector = __webpack_require__("./src/js/util/reducerInjector.js");\n\nvar _reducerInjector2 = _interopRequireDefault(_reducerInjector);\n\nvar _constants = __webpack_require__("./src/js/containers/home/constants.js");\n\nvar _actions = __webpack_require__("./src/js/containers/home/actions.js");\n\nvar _reducer = __webpack_require__("./src/js/containers/home/reducer.js");\n\nvar _reducer2 = __webpack_require__("./src/js/containers/app/reducer.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Home = function (_React$PureComponent) {\n  _inherits(Home, _React$PureComponent);\n\n  function Home() {\n    _classCallCheck(this, Home);\n\n    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));\n  }\n\n  _createClass(Home, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      var _props = this.props,\n          onLoadHome = _props.onLoadHome,\n          match = _props.match,\n          app = _props.app;\n\n\n      if (app.url !== match.url) {\n        onLoadHome(match.path);\n      }\n    }\n\n    // returns the JSX that will be rendered for this component\n\n  }, {\n    key: "render",\n    value: function render() {\n      var _props$home = this.props.home,\n          title = _props$home.title,\n          html = _props$home.html,\n          buttons = _props$home.buttons;\n\n      return _react2.default.createElement(\n        "section",\n        { className: "home content" },\n        _react2.default.createElement(_card2.default, { title: title, html: html, buttons: buttons })\n      );\n    }\n  }], [{\n    key: "fetchData",\n    value: function fetchData(store, _ref) {\n      var path = _ref.path;\n\n      return store.dispatch((0, _actions.fetchHome)(path));\n    }\n  }, {\n    key: "getReducer",\n    value: function getReducer() {\n      return { key: _constants.REDUCER_NAME, reducer: _reducer.homeReducer };\n    }\n  }]);\n\n  return Home;\n}(_react2.default.PureComponent);\n\n// maps the redux store state to the props related to the data from the store\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    home: (0, _reducer.getHomeState)(state).toJS(),\n    app: (0, _reducer2.getAppState)(state).toJS()\n  };\n};\n\n// specifies the behaviour, which callback prop dispatches which action\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    onLoadHome: function onLoadHome(data) {\n      return dispatch((0, _actions.fetchHome)(data));\n    }\n  };\n};\n\nvar withReducer = (0, _reducerInjector2.default)(_constants.REDUCER_NAME, _reducer.homeReducer)(Home);\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(withReducer);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/home/index.jsx\n// module id = ./src/js/containers/home/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/home/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/home/reducer.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getHomeState = exports.homeReducer = undefined;\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _constants = __webpack_require__("./src/js/containers/home/constants.js");\n\nvar initialState = (0, _immutable.fromJS)({\n  title: "",\n  html: "",\n  buttons: []\n});\n\nvar homeReducer = exports.homeReducer = function homeReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _constants.SET_HOME:\n      return state.set("title", action.data.title).set("html", action.data.html).set("buttons", action.data.buttons);\n    default:\n      return state;\n  }\n};\n\nvar getHomeState = exports.getHomeState = function getHomeState(state) {\n  if (state.get(_constants.REDUCER_NAME)) {\n    return state.get(_constants.REDUCER_NAME);\n  } else {\n    return initialState;\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/home/reducer.js\n// module id = ./src/js/containers/home/reducer.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/home/reducer.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/layout/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _index = __webpack_require__("./src/js/containers/header/index.jsx");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__("./src/js/containers/footer/index.jsx");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _meta = __webpack_require__("./src/js/components/meta/meta.jsx");\n\nvar _meta2 = _interopRequireDefault(_meta);\n\nvar _fade = __webpack_require__("./src/js/components/transitions/fade.jsx");\n\nvar _fade2 = _interopRequireDefault(_fade);\n\nvar _reducer = __webpack_require__("./src/js/containers/app/reducer.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Layout = function (_React$PureComponent) {\n  _inherits(Layout, _React$PureComponent);\n\n  function Layout() {\n    _classCallCheck(this, Layout);\n\n    return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));\n  }\n\n  _createClass(Layout, [{\n    key: "render",\n\n    // returns the JSX that will be rendered for this component\n    value: function render() {\n      var _props = this.props,\n          children = _props.children,\n          app = _props.app;\n\n      return _react2.default.createElement(\n        "div",\n        { className: (app.isLoading ? "is-loading" : "") + " layout" },\n        _react2.default.createElement(_meta2.default, { meta: app.meta, url: app.url }),\n        _react2.default.createElement(_index2.default, null),\n        _react2.default.createElement(\n          _fade2.default,\n          { "in": !app.isLoading },\n          _react2.default.createElement("main", { id: "main", className: "main" })\n        ),\n        _react2.default.createElement(_index4.default, null)\n      );\n    }\n  }]);\n\n  return Layout;\n}(_react2.default.PureComponent);\n\n// maps the redux store state to the props related to the data from the store\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return { app: (0, _reducer.getAppState)(state).toJS() };\n};\n\nexports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, null)(Layout));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/layout/index.jsx\n// module id = ./src/js/containers/layout/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/layout/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/page/actions.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.fetchPage = undefined;\n\nvar _constants = __webpack_require__("./src/js/containers/page/constants.js");\n\nvar _actions = __webpack_require__("./src/js/containers/app/actions.js");\n\nvar _service = __webpack_require__("./service/service.js");\n\nvar loadPage = function loadPage(data) {\n  return {\n    type: _constants.SET_PAGE,\n    data: data\n  };\n};\n\nvar fetchPage = exports.fetchPage = function fetchPage(data) {\n  return function (dispatch) {\n    dispatch((0, _actions.isLoading)(true));\n\n    return (0, _service.getPageData)(data).then(function (response) {\n      dispatch((0, _actions.setMeta)(response.meta));\n      dispatch((0, _actions.setUrl)(response.url));\n      dispatch((0, _actions.setTitle)(response.title));\n      return response;\n    }).then(function (response) {\n      dispatch((0, _actions.isLoading)(false));\n      dispatch(loadPage(response));\n    }).catch(function (error) {\n      console.error(error);\n      throw error;\n    });\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/page/actions.js\n// module id = ./src/js/containers/page/actions.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/page/actions.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/page/constants.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar SET_PAGE = exports.SET_PAGE = "Page/SET_PAGE";\nvar REDUCER_NAME = exports.REDUCER_NAME = "page";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/page/constants.js\n// module id = ./src/js/containers/page/constants.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/page/constants.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/page/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _card = __webpack_require__("./src/js/components/card/card.jsx");\n\nvar _card2 = _interopRequireDefault(_card);\n\nvar _reducerInjector = __webpack_require__("./src/js/util/reducerInjector.js");\n\nvar _reducerInjector2 = _interopRequireDefault(_reducerInjector);\n\nvar _constants = __webpack_require__("./src/js/containers/page/constants.js");\n\nvar _actions = __webpack_require__("./src/js/containers/page/actions.js");\n\nvar _reducer = __webpack_require__("./src/js/containers/page/reducer.js");\n\nvar _reducer2 = __webpack_require__("./src/js/containers/app/reducer.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Page = function (_React$PureComponent) {\n  _inherits(Page, _React$PureComponent);\n\n  function Page() {\n    _classCallCheck(this, Page);\n\n    return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));\n  }\n\n  _createClass(Page, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      var _props = this.props,\n          onLoadPage = _props.onLoadPage,\n          match = _props.match,\n          path = _props.path,\n          app = _props.app;\n\n\n      if (app.url !== (path || match.url)) {\n        onLoadPage(path || match.path);\n      }\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var page = this.props.page;\n\n\n      return _react2.default.createElement(\n        "section",\n        { className: "content" },\n        _react2.default.createElement(_card2.default, { title: page.title, html: page.html, buttons: page.buttons })\n      );\n    }\n  }], [{\n    key: "fetchData",\n    value: function fetchData(store, _ref) {\n      var path = _ref.path;\n\n      return store.dispatch((0, _actions.fetchPage)(path));\n    }\n  }, {\n    key: "getReducer",\n    value: function getReducer() {\n      return { key: _constants.REDUCER_NAME, reducer: _reducer.pageReducer };\n    }\n  }]);\n\n  return Page;\n}(_react2.default.PureComponent);\n\n// maps the redux store state to the props related to the data from the store\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return { page: (0, _reducer.getPageState)(state).toJS(), app: (0, _reducer2.getAppState)(state).toJS() };\n};\n\n// specifies the behaviour, which callback prop dispatches which action\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    onLoadPage: function onLoadPage(data) {\n      return dispatch((0, _actions.fetchPage)(data));\n    }\n  };\n};\n\nvar withReducer = (0, _reducerInjector2.default)(_constants.REDUCER_NAME, _reducer.pageReducer)(Page);\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(withReducer);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/page/index.jsx\n// module id = ./src/js/containers/page/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/page/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/page/reducer.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getPageState = exports.pageReducer = undefined;\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _constants = __webpack_require__("./src/js/containers/page/constants.js");\n\nvar initialState = (0, _immutable.fromJS)({\n  title: "",\n  html: "",\n  buttons: []\n});\n\nvar pageReducer = exports.pageReducer = function pageReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _constants.SET_PAGE:\n      return state.set("title", action.data.title).set("html", action.data.html).set("buttons", action.data.buttons);\n    default:\n      return state;\n  }\n};\n\nvar getPageState = exports.getPageState = function getPageState(state) {\n  if (state.get(_constants.REDUCER_NAME)) {\n    return state.get(_constants.REDUCER_NAME);\n  } else {\n    return initialState;\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/page/reducer.js\n// module id = ./src/js/containers/page/reducer.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/page/reducer.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/routes/actions.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.fetchRoutes = undefined;\n\nvar _constants = __webpack_require__("./src/js/containers/routes/constants.js");\n\nvar _service = __webpack_require__("./service/service.js");\n\nvar loadRoutes = function loadRoutes(data) {\n  return {\n    type: _constants.SET_ROUTES,\n    data: data\n  };\n};\n\nvar fetchRoutes = exports.fetchRoutes = function fetchRoutes(data) {\n  return function (dispatch) {\n    return (0, _service.getRouteData)(data).then(function (response) {\n      dispatch(loadRoutes(response));\n      return response;\n    }).catch(function () {\n      console.error(error);\n      throw error;\n    });\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/routes/actions.js\n// module id = ./src/js/containers/routes/actions.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/routes/actions.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/routes/constants.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar SET_ROUTES = exports.SET_ROUTES = "Routes/SET_ROUTES";\nvar REDUCER_NAME = exports.REDUCER_NAME = "routes";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/routes/constants.js\n// module id = ./src/js/containers/routes/constants.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/routes/constants.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/routes/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getRouteComponent = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__("react-router-dom");\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _reducer = __webpack_require__("./src/js/containers/routes/reducer.js");\n\nvar _actions = __webpack_require__("./src/js/containers/routes/actions.js");\n\nvar _scrollToTop = __webpack_require__("./src/js/components/routes/scrollToTop.jsx");\n\nvar _scrollToTop2 = _interopRequireDefault(_scrollToTop);\n\nvar _index = __webpack_require__("./src/js/containers/layout/index.jsx");\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__("./src/js/containers/home/index.jsx");\n\nvar _index4 = _interopRequireDefault(_index3);\n\nvar _index5 = __webpack_require__("./src/js/containers/settings/index.jsx");\n\nvar _index6 = _interopRequireDefault(_index5);\n\nvar _index7 = __webpack_require__("./src/js/containers/page/index.jsx");\n\nvar _index8 = _interopRequireDefault(_index7);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Routes = function (_React$PureComponent) {\n  _inherits(Routes, _React$PureComponent);\n\n  function Routes() {\n    _classCallCheck(this, Routes);\n\n    return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));\n  }\n\n  _createClass(Routes, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      var fetchData = this.props.fetchData;\n\n      fetchData();\n    }\n  }, {\n    key: "render",\n    value: function render() {\n      var routes = this.props.routes;\n\n\n      return _react2.default.createElement(\n        _index2.default,\n        null,\n        _react2.default.createElement(\n          _scrollToTop2.default,\n          null,\n          _react2.default.createElement(\n            _reactRouterDom.Switch,\n            null,\n            routes.map(function (route) {\n              return _react2.default.createElement(_reactRouterDom.Route, {\n                key: route.url,\n                exact: true,\n                path: route.url,\n                component: getRouteComponent(route.name).component\n              });\n            }),\n            _react2.default.createElement(_reactRouterDom.Route, {\n              render: function render(props) {\n                return _react2.default.createElement(_index8.default, _extends({}, props, { path: "/page-not-found" }));\n              }\n            }),\n            "/>"\n          )\n        )\n      );\n    }\n  }], [{\n    key: "fetchData",\n    value: function fetchData(store) {\n      return store.dispatch((0, _actions.fetchRoutes)());\n    }\n  }]);\n\n  return Routes;\n}(_react2.default.PureComponent);\n\nvar getRouteComponent = exports.getRouteComponent = function getRouteComponent(name) {\n  switch (name) {\n    case "Home":\n      return {\n        component: _index4.default,\n        getReducer: _index4.default.getReducer,\n        fetchData: _index4.default.fetchData\n      };\n    case "Settings":\n      return {\n        component: _index6.default,\n        getReducer: _index6.default.getReducer,\n        fetchData: _index6.default.fetchData\n      };\n    case "Page":\n      return {\n        component: _index8.default,\n        getReducer: _index8.default.getReducer,\n        fetchData: _index8.default.fetchData\n      };\n    default:\n      return undefined;\n  }\n};\n\n// maps the redux store state to the props related to the data from the store\nvar mapStateToProps = function mapStateToProps(state) {\n  return (0, _reducer.getRoutesState)(state).toJS();\n};\n\n// specifies the behaviour, which callback prop dispatches which action\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    fetchData: function fetchData(data) {\n      return dispatch((0, _actions.fetchRoutes)(data));\n    }\n  };\n};\n\nexports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Routes));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/routes/index.jsx\n// module id = ./src/js/containers/routes/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/routes/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/routes/reducer.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getRoutesState = exports.routesReducer = undefined;\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _constants = __webpack_require__("./src/js/containers/routes/constants.js");\n\nvar initialState = (0, _immutable.fromJS)({\n  routes: [],\n  isLoading: false,\n  isError: false\n});\n\nvar routesReducer = exports.routesReducer = function routesReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _constants.SET_ROUTES:\n      return state.set("routes", action.data);\n    default:\n      return state;\n  }\n};\n\nvar getRoutesState = exports.getRoutesState = function getRoutesState(state) {\n  if (state.get(_constants.REDUCER_NAME)) {\n    return state.get(_constants.REDUCER_NAME);\n  } else {\n    return initialState;\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/routes/reducer.js\n// module id = ./src/js/containers/routes/reducer.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/routes/reducer.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/settings/actions.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.fetchSettings = exports.setPushEnabled = undefined;\n\nvar _constants = __webpack_require__("./src/js/containers/settings/constants.js");\n\nvar _actions = __webpack_require__("./src/js/containers/app/actions.js");\n\nvar _service = __webpack_require__("./service/service.js");\n\nvar setPushEnabled = exports.setPushEnabled = function setPushEnabled(data) {\n  return {\n    type: _constants.SET_PUSH_ENABLED,\n    data: data\n  };\n};\n\nvar fetchSettings = exports.fetchSettings = function fetchSettings(data) {\n  return function (dispatch) {\n    dispatch((0, _actions.isLoading)(true));\n\n    return (0, _service.getPageData)(data).then(function (response) {\n      dispatch((0, _actions.setMeta)(response.meta));\n      dispatch((0, _actions.setUrl)(response.url));\n      dispatch((0, _actions.setTitle)(response.title));\n      return response;\n    }).then(function (response) {\n      dispatch((0, _actions.isLoading)(false));\n      dispatch(setPushEnabled(false));\n    }).catch(function (error) {\n      console.error(error);\n      throw error;\n    });\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/settings/actions.js\n// module id = ./src/js/containers/settings/actions.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/settings/actions.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/settings/constants.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar SET_PUSH_ENABLED = exports.SET_PUSH_ENABLED = "Settings/SET_PUSH_ENABLED";\nvar REDUCER_NAME = exports.REDUCER_NAME = "settings";\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/settings/constants.js\n// module id = ./src/js/containers/settings/constants.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/settings/constants.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/settings/index.jsx": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__("react-redux");\n\nvar _a2hs = __webpack_require__("./src/js/containers/a2hs/a2hs.jsx");\n\nvar _a2hs2 = _interopRequireDefault(_a2hs);\n\nvar _push = __webpack_require__("./src/js/components/push/push.jsx");\n\nvar _push2 = _interopRequireDefault(_push);\n\nvar _reducerInjector = __webpack_require__("./src/js/util/reducerInjector.js");\n\nvar _reducerInjector2 = _interopRequireDefault(_reducerInjector);\n\nvar _constants = __webpack_require__("./src/js/containers/settings/constants.js");\n\nvar _actions = __webpack_require__("./src/js/containers/settings/actions.js");\n\nvar _reducer = __webpack_require__("./src/js/containers/settings/reducer.js");\n\nvar _reducer2 = __webpack_require__("./src/js/containers/app/reducer.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Settings = function (_React$PureComponent) {\n  _inherits(Settings, _React$PureComponent);\n\n  function Settings() {\n    _classCallCheck(this, Settings);\n\n    return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).apply(this, arguments));\n  }\n\n  _createClass(Settings, [{\n    key: "componentDidMount",\n    value: function componentDidMount() {\n      var _props = this.props,\n          onLoadSettings = _props.onLoadSettings,\n          match = _props.match,\n          app = _props.app;\n\n\n      if (app.url !== match.url) {\n        onLoadSettings(match.path);\n      }\n    }\n\n    // returns the JSX that will be rendered for this component\n\n  }, {\n    key: "render",\n    value: function render() {\n      var _props2 = this.props,\n          settings = _props2.settings,\n          onSetPushEnabled = _props2.onSetPushEnabled;\n\n      return _react2.default.createElement(\n        "section",\n        { className: "settings" },\n        _react2.default.createElement(\n          "ul",\n          { className: "setting-list" },\n          _react2.default.createElement(\n            "li",\n            { className: "item" },\n            _react2.default.createElement(_push2.default, {\n              title: "Push Notifications",\n              html: "Enable push notifications",\n              isPushEnabled: settings.isPushEnabled,\n              onSetPushEnabled: onSetPushEnabled\n            })\n          ),\n          _react2.default.createElement(\n            "li",\n            { className: "item" },\n            _react2.default.createElement(\n              _a2hs2.default,\n              { className: "title" },\n              "Add To Homescreen"\n            )\n          ),\n          _react2.default.createElement(\n            "li",\n            { className: "item" },\n            _react2.default.createElement(\n              "a",\n              {\n                href: "https://www.incredible-web.com/",\n                target: "_blank",\n                className: "title"\n              },\n              "About Incredible Web"\n            )\n          )\n        )\n      );\n    }\n  }], [{\n    key: "fetchData",\n    value: function fetchData(store, _ref) {\n      var path = _ref.path;\n\n      return store.dispatch((0, _actions.fetchSettings)(path));\n    }\n  }, {\n    key: "getReducer",\n    value: function getReducer() {\n      return { key: _constants.REDUCER_NAME, reducer: _reducer.settingsReducer };\n    }\n  }]);\n\n  return Settings;\n}(_react2.default.PureComponent);\n\n// maps the redux store state to the props related to the data from the store\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    settings: (0, _reducer.getSettingsState)(state).toJS(),\n    app: (0, _reducer2.getAppState)(state).toJS()\n  };\n};\n\n// specifies the behaviour, which callback prop dispatches which action\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    onLoadSettings: function onLoadSettings(data) {\n      return dispatch((0, _actions.fetchSettings)(data));\n    },\n    onSetPushEnabled: function onSetPushEnabled(data) {\n      return dispatch((0, _actions.setPushEnabled)(data));\n    }\n  };\n};\n\nvar withReducer = (0, _reducerInjector2.default)(_constants.REDUCER_NAME, _reducer.settingsReducer)(Settings);\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(withReducer);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/settings/index.jsx\n// module id = ./src/js/containers/settings/index.jsx\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/settings/index.jsx?'
      );

      /***/
    },

    /***/ /***/ "./src/js/containers/settings/reducer.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getSettingsState = exports.settingsReducer = undefined;\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _constants = __webpack_require__("./src/js/containers/settings/constants.js");\n\nvar initialState = (0, _immutable.fromJS)({\n  isPushEnabled: false\n});\n\nvar settingsReducer = exports.settingsReducer = function settingsReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _constants.SET_PUSH_ENABLED:\n      return state.set("isPushEnabled", action.data);\n    default:\n      return state;\n  }\n};\n\nvar getSettingsState = exports.getSettingsState = function getSettingsState(state) {\n  if (state.get(_constants.REDUCER_NAME)) {\n    return state.get(_constants.REDUCER_NAME);\n  } else {\n    return initialState;\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/containers/settings/reducer.js\n// module id = ./src/js/containers/settings/reducer.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/containers/settings/reducer.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/util/reducerInjector.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__("react");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__("prop-types");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _hoistNonReactStatics = __webpack_require__("hoist-non-react-statics");\n\nvar _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);\n\nvar _store = __webpack_require__("./src/js/util/store.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nexports.default = function (key, reducer) {\n  return function (WrappedComponent) {\n    var ReducerInjector = function (_React$Component) {\n      _inherits(ReducerInjector, _React$Component);\n\n      function ReducerInjector() {\n        _classCallCheck(this, ReducerInjector);\n\n        return _possibleConstructorReturn(this, (ReducerInjector.__proto__ || Object.getPrototypeOf(ReducerInjector)).apply(this, arguments));\n      }\n\n      _createClass(ReducerInjector, [{\n        key: "componentWillMount",\n        value: function componentWillMount() {\n          (0, _store.injectReducer)(this.context.store, key, reducer);\n        }\n      }, {\n        key: "render",\n        value: function render() {\n          return _react2.default.createElement(WrappedComponent, this.props);\n        }\n      }]);\n\n      return ReducerInjector;\n    }(_react2.default.Component);\n\n    ReducerInjector.contextTypes = {\n      store: _propTypes2.default.object.isRequired\n    };\n\n    return (0, _hoistNonReactStatics2.default)(ReducerInjector, WrappedComponent);\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/util/reducerInjector.js\n// module id = ./src/js/util/reducerInjector.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/util/reducerInjector.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/util/reducers.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**\r\n                                                                                                                                                                                                                                                                   * Combine all reducers in this file and export the combined reducers.\r\n                                                                                                                                                                                                                                                                   */\n\n\n// global reducers\n\n\nexports.default = createReducer;\n\nvar _reduxImmutable = __webpack_require__("redux-immutable");\n\nvar _reducer = __webpack_require__("./src/js/containers/routes/reducer.js");\n\nvar _reducer2 = __webpack_require__("./src/js/containers/app/reducer.js");\n\nvar _reducer3 = __webpack_require__("./src/js/containers/header/reducer.js");\n\nvar _reducer4 = __webpack_require__("./src/js/containers/home/reducer.js");\n\nvar _reducer5 = __webpack_require__("./src/js/containers/page/reducer.js");\n\nvar _reducer6 = __webpack_require__("./src/js/containers/settings/reducer.js");\n\nfunction createReducer(injectedReducers) {\n  return (0, _reduxImmutable.combineReducers)(_extends({\n    routes: _reducer.routesReducer,\n    app: _reducer2.appReducer,\n    page: _reducer5.pageReducer,\n    home: _reducer4.homeReducer,\n    settings: _reducer6.settingsReducer,\n    header: _reducer3.headerReducer\n  }, injectedReducers));\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/util/reducers.js\n// module id = ./src/js/util/reducers.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/util/reducers.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/util/store.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.configureStore = configureStore;\nexports.injectReducer = injectReducer;\n\nvar _redux = __webpack_require__("redux");\n\nvar _immutable = __webpack_require__("immutable");\n\nvar _reduxThunk = __webpack_require__("redux-thunk");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _developmentOnly = __webpack_require__("redux-devtools-extension/developmentOnly");\n\nvar _reducers = __webpack_require__("./src/js/util/reducers.js");\n\nvar _reducers2 = _interopRequireDefault(_reducers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction configureStore() {\n  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  var store = (0, _redux.createStore)((0, _reducers2.default)(), (0, _immutable.fromJS)(initialState), (0, _developmentOnly.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));\n\n  store.injectedReducers = {}; // Reducer registry\n\n  return store;\n} /**\r\n   * Create the store with dynamic reducers\r\n   * Based on: https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application\r\n   */\n\nfunction injectReducer(store, name, asyncReducer) {\n  // TODO: unable to user reducer injection because of preloaded state\n  // store.injectedReducers[name] = asyncReducer;\n  // store.replaceReducer(createReducer(store.injectedReducers));\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/util/store.js\n// module id = ./src/js/util/store.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/util/store.js?'
      );

      /***/
    },

    /***/ /***/ "./src/js/util/util.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.toQueryString = toQueryString;\nexports.debounce = debounce;\nexports.getUuid = getUuid;\nexports.getParameterByName = getParameterByName;\nexports.getHostName = getHostName;\nexports.updateQueryStringParameter = updateQueryStringParameter;\nexports.removeQueryParameter = removeQueryParameter;\nfunction toQueryString(obj) {\n  var str = [];\n  for (var p in obj) {\n    if (obj.hasOwnProperty(p)) {\n      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));\n    }\n  }\n  return str.join("&");\n}\n\n// Returns a function, that, as long as it continues to be invoked, will not\n// be triggered. The function will be called after it stops being called for\n// N milliseconds. If `immediate` is passed, trigger the function on the\n// leading edge, instead of the trailing.\nfunction debounce(func, wait, immediate) {\n  var _this = this,\n      _arguments = arguments;\n\n  var timeout = void 0;\n  return function () {\n    var context = _this;\n    var args = _arguments;\n    var later = function later() {\n      timeout = null;\n      if (!immediate) func.apply(context, args);\n    };\n    var callNow = immediate && !timeout;\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n    if (callNow) func.apply(context, args);\n  };\n}\n\n// function returns a universally unique identifier (note this is not RFC4122 compliant)\nfunction getUuid() {\n  function s4() {\n    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);\n  }\n  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();\n}\n\n// retrieves a parameter from the query string by name\nfunction getParameterByName(name, string) {\n  name = name.replace(/[[]/, "\\\\[").replace(/[\\]]/, "\\\\]");\n  var regex = new RegExp("[\\\\?&]" + name + "=([^&#]*)");\n  var results = regex.exec(string || location.search);\n  return results === null ? "" : decodeURIComponent(results[1].replace(/\\+/g, " "));\n}\n\nfunction getHostName(url) {\n  var match = url.match(/:\\/\\/(www[0-9]?\\.)?(.[^/:]+)/i);\n  if (match != null && match.length > 2 && typeof match[2] === "string" && match[2].length > 0) {\n    return match[2];\n  } else {\n    return "";\n  }\n}\n\n// append key=value to query string\nfunction updateQueryStringParameter(uri, key, value) {\n  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");\n  var separator = uri.indexOf("?") !== -1 ? "&" : "?";\n  if (uri.match(re)) {\n    return uri.replace(re, "$1" + key + "=" + value + "$2");\n  } else {\n    return uri + separator + key + "=" + value;\n  }\n}\n\nfunction removeQueryParameter(uri, key) {\n  // prefer to use l.search if you have a location/link object\n  var prefix = encodeURIComponent(key) + "=";\n  var pars = uri.split(/[&;]/g);\n  // reverse iteration as may be destructive\n  for (var i = pars.length; i-- > 0;) {\n    // idiom for string.startsWith\n    if (pars[i].lastIndexOf(prefix) !== -1) {\n      pars.splice(i, 1);\n    }\n  }\n  uri = pars.length > 0 ? pars.join("&") : "";\n  return uri;\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/util/util.js\n// module id = ./src/js/util/util.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/util/util.js?'
      );

      /***/
    },

    /***/ /***/ 0: function(module, exports, __webpack_require__) {
      eval(
        'module.exports = __webpack_require__("./app.babel.js");\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./app.babel.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./app.babel.js?'
      );

      /***/
    },

    /***/ /***/ "body-parser": function(module, exports) {
      eval(
        'module.exports = require("body-parser");\n\n//////////////////\n// WEBPACK FOOTER\n// external "body-parser"\n// module id = body-parser\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22body-parser%22?'
      );

      /***/
    },

    /***/ /***/ compression: function(module, exports) {
      eval(
        'module.exports = require("compression");\n\n//////////////////\n// WEBPACK FOOTER\n// external "compression"\n// module id = compression\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22compression%22?'
      );

      /***/
    },

    /***/ /***/ express: function(module, exports) {
      eval(
        'module.exports = require("express");\n\n//////////////////\n// WEBPACK FOOTER\n// external "express"\n// module id = express\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express%22?'
      );

      /***/
    },

    /***/ /***/ "express-handlebars": function(module, exports) {
      eval(
        'module.exports = require("express-handlebars");\n\n//////////////////\n// WEBPACK FOOTER\n// external "express-handlebars"\n// module id = express-handlebars\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express-handlebars%22?'
      );

      /***/
    },

    /***/ /***/ "express-session": function(module, exports) {
      eval(
        'module.exports = require("express-session");\n\n//////////////////\n// WEBPACK FOOTER\n// external "express-session"\n// module id = express-session\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express-session%22?'
      );

      /***/
    },

    /***/ /***/ fs: function(module, exports) {
      eval(
        'module.exports = require("fs");\n\n//////////////////\n// WEBPACK FOOTER\n// external "fs"\n// module id = fs\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22fs%22?'
      );

      /***/
    },

    /***/ /***/ handlebars: function(module, exports) {
      eval(
        'module.exports = require("handlebars");\n\n//////////////////\n// WEBPACK FOOTER\n// external "handlebars"\n// module id = handlebars\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22handlebars%22?'
      );

      /***/
    },

    /***/ /***/ "hoist-non-react-statics": function(module, exports) {
      eval(
        'module.exports = require("hoist-non-react-statics");\n\n//////////////////\n// WEBPACK FOOTER\n// external "hoist-non-react-statics"\n// module id = hoist-non-react-statics\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22hoist-non-react-statics%22?'
      );

      /***/
    },

    /***/ /***/ https: function(module, exports) {
      eval(
        'module.exports = require("https");\n\n//////////////////\n// WEBPACK FOOTER\n// external "https"\n// module id = https\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22https%22?'
      );

      /***/
    },

    /***/ /***/ immutable: function(module, exports) {
      eval(
        'module.exports = require("immutable");\n\n//////////////////\n// WEBPACK FOOTER\n// external "immutable"\n// module id = immutable\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22immutable%22?'
      );

      /***/
    },

    /***/ /***/ modernizr: function(module, exports) {
      eval(
        'module.exports = require("modernizr");\n\n//////////////////\n// WEBPACK FOOTER\n// external "modernizr"\n// module id = modernizr\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22modernizr%22?'
      );

      /***/
    },

    /***/ /***/ path: function(module, exports) {
      eval(
        'module.exports = require("path");\n\n//////////////////\n// WEBPACK FOOTER\n// external "path"\n// module id = path\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22path%22?'
      );

      /***/
    },

    /***/ /***/ "prop-types": function(module, exports) {
      eval(
        'module.exports = require("prop-types");\n\n//////////////////\n// WEBPACK FOOTER\n// external "prop-types"\n// module id = prop-types\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22prop-types%22?'
      );

      /***/
    },

    /***/ /***/ react: function(module, exports) {
      eval(
        'module.exports = require("react");\n\n//////////////////\n// WEBPACK FOOTER\n// external "react"\n// module id = react\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react%22?'
      );

      /***/
    },

    /***/ /***/ "react-dom/server": function(module, exports) {
      eval(
        'module.exports = require("react-dom/server");\n\n//////////////////\n// WEBPACK FOOTER\n// external "react-dom/server"\n// module id = react-dom/server\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?'
      );

      /***/
    },

    /***/ /***/ "react-helmet": function(module, exports) {
      eval(
        'module.exports = require("react-helmet");\n\n//////////////////\n// WEBPACK FOOTER\n// external "react-helmet"\n// module id = react-helmet\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react-helmet%22?'
      );

      /***/
    },

    /***/ /***/ "react-redux": function(module, exports) {
      eval(
        'module.exports = require("react-redux");\n\n//////////////////\n// WEBPACK FOOTER\n// external "react-redux"\n// module id = react-redux\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react-redux%22?'
      );

      /***/
    },

    /***/ /***/ "react-router-dom": function(module, exports) {
      eval(
        'module.exports = require("react-router-dom");\n\n//////////////////\n// WEBPACK FOOTER\n// external "react-router-dom"\n// module id = react-router-dom\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?'
      );

      /***/
    },

    /***/ /***/ "react-transition-group": function(module, exports) {
      eval(
        'module.exports = require("react-transition-group");\n\n//////////////////\n// WEBPACK FOOTER\n// external "react-transition-group"\n// module id = react-transition-group\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react-transition-group%22?'
      );

      /***/
    },

    /***/ /***/ redux: function(module, exports) {
      eval(
        'module.exports = require("redux");\n\n//////////////////\n// WEBPACK FOOTER\n// external "redux"\n// module id = redux\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22redux%22?'
      );

      /***/
    },

    /***/ /***/ "redux-devtools-extension/developmentOnly": function(
      module,
      exports
    ) {
      eval(
        'module.exports = require("redux-devtools-extension/developmentOnly");\n\n//////////////////\n// WEBPACK FOOTER\n// external "redux-devtools-extension/developmentOnly"\n// module id = redux-devtools-extension/developmentOnly\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22redux-devtools-extension/developmentOnly%22?'
      );

      /***/
    },

    /***/ /***/ "redux-immutable": function(module, exports) {
      eval(
        'module.exports = require("redux-immutable");\n\n//////////////////\n// WEBPACK FOOTER\n// external "redux-immutable"\n// module id = redux-immutable\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22redux-immutable%22?'
      );

      /***/
    },

    /***/ /***/ "redux-thunk": function(module, exports) {
      eval(
        'module.exports = require("redux-thunk");\n\n//////////////////\n// WEBPACK FOOTER\n// external "redux-thunk"\n// module id = redux-thunk\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?'
      );

      /***/
    }

    /******/
  }
);
