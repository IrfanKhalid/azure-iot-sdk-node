/*! Copyright (c) Microsoft. All rights reserved.
 *! Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

'use strict';

import { createDictionary } from './dictionary';
import { ArgumentError } from './errors';

/**
 * Describes the parameters that enable a device or cloud application to connect to an Azure IoT hub.
 */
export class ConnectionString {
  /**
   * Hostname of the Azure IoT hub.
   * @memberof {azure-iot-common.ConnectionString}
   */
  // tslint:disable-next-line:variable-name
  HostName?: string;
  /**
   * Unique device identifier as it exists in the device identity registry. This is only used for device connection strings.
   * @memberof {azure-iot-common.ConnectionString}
   */
  // tslint:disable-next-line:variable-name
  DeviceId?: string;
  /**
   * Symmetric key used to create shared access signature tokens that are in turn used to authenticate the connection. Associated either with a specific device or a specific service policy.
   * @memberof {azure-iot-common.ConnectionString}
   */
  // tslint:disable-next-line:variable-name
  SharedAccessKey?: string;
  /**
   * Name of the access policy used to connect to the Azure IoT hub. used only in the case of the service SDK, unused with the Device SDK (which uses `DeviceId` instead).
   * @memberof {azure-iot-common.ConnectionString}
   */
  // tslint:disable-next-line:variable-name
  SharedAccessKeyName?: string;
  /**
   * This was used in public preview when MQTT support required the use of a protocol gateway.
   * Now that MQTT is supported natively in Azure IoT Hub, this parameter is ignored and kept only for compatibility purposes.
   * @memberof {azure-iot-common.ConnectionString}
   * @deprecated
   */
  // tslint:disable-next-line:variable-name
  GatewayHostName?: string;
  /**
   * This property exists only if a device uses x509 certificates for authentication and if it exists, will be set to True.
   * @memberof {azure-iot-common.ConnectionString}
   */
  // tslint:disable-next-line:variable-name
  x509?: string;

  /**
   * Parses a string and returns the corresponding {@link azure-iot-common.ConnectionString} object.
   * @param {string}   source          string from which the connection string will be extracted
   * @param {string[]} requiredFields  array of strings listing the fields that are expected to be found.
   */
  static parse(source: string, requiredFields?: string[]): ConnectionString {
    /*Codes_SRS_NODE_CONNSTR_05_001: [The input argument source shall be converted to string if necessary.]*/
    /*Codes_SRS_NODE_CONNSTR_05_002: [The parse method shall create a new instance of ConnectionString.]*/
    const connectionString: ConnectionString = createDictionary(source, ';') as ConnectionString;
    const err = 'The connection string is missing the property: ';

    /*Codes_SRS_NODE_CONNSTR_05_007: [If requiredFields is falsy, parse shall not validate fields.]*/
    requiredFields = requiredFields || [];

    /*Codes_SRS_NODE_CONNSTR_05_005: [The parse method shall throw ArgumentError if any of fields in the requiredFields argument are not found in the source argument.]*/
    requiredFields.forEach((key: string): void => {
      if (!(key in connectionString)) throw new ArgumentError(err + key);
    });

    /*Codes_SRS_NODE_CONNSTR_05_003: [It shall accept a string argument of the form 'name=value[;name=value…]' and for each name extracted it shall create a new property on the ConnectionString object instance.]*/
    /*Codes_SRS_NODE_CONNSTR_05_004: [The value of the property shall be the value extracted from the source argument for the corresponding name.]*/
    /*Codes_SRS_NODE_CONNSTR_05_006: [The generated ConnectionString object shall be returned to the caller.]*/
    return connectionString;
  }
}
