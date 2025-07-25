declare namespace OZONE {
  namespace utils {
    function formToArray(id: string): Record<any, any> | undefined;
  }

  namespace ajax {
    function requestModule(
      str: string,
      payload: any,
      callback: (...xs: any[]) => any
    ): any;
  }
}

declare namespace WIKIDOT {
  namespace modules {
    namespace PageEditModule {
      namespace vars {
        let editMode: any;
      }
    }
  }

  namespace page {
    namespace vars {
      let locked: boolean;
      let draft: any;
      let draftText: any;
      let draftTitle: any;
      let draftDateLastSaved: any;
      namespace editlock {
        let id: any;
        let secret: any;
        let revisionId: any;
        let timeLeft: any;
      }
    }

    namespace listeners {
      let filesClick: (a: any) => any;
    }
  }
}

declare namespace WIKIREQUEST {
  namespace info {
    let pageId: any;
    let requestPageName: any;
  }

  let userId: number | undefined;
}
