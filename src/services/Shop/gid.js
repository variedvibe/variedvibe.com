import { errorSlugInvalidGid } from "./errors.js";

const gidProtocol = "gid:";

export class Gid {
  namespace;
  type;
  id;
  params;

  constructor(namespace, type, id, params) {
    this.namespace = namespace;
    this.type = type;
    this.id = id;
    this.params = params;
  }

  // Parse a GID string
  //
  // Gid strings look like the following:
  //  gid://namespace/type/hexstringhere?param=value
  static parse(str) {
    let gidUrl;

    try {
      gidUrl = new URL(str);
    } catch (e) {
      throw new Error(errorSlugInvalidGid);
    }

    // Get the parts of the GID by splitting at each path separator, while
    // removing empty parts.
    let gidParts = gidUrl.pathname.split("/").filter(Boolean);

    if (gidUrl.protocol !== gidProtocol || gidParts.length < 3) {
      throw new Error(errorSlugInvalidGid);
    }

    return new this(gidParts[0], gidParts[1], gidParts[2], gidUrl.searchParams);
  }
}
