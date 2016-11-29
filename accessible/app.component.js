/**
 * AccessibleBlockly
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Top-level component for the Accessible Blockly application.
 * @author madeeha@google.com (Madeeha Ghori)
 */

blocklyApp.workspace = new Blockly.Workspace();

blocklyApp.AppView = ng.core.Component({
  selector: 'blockly-app',
  template: `
    <div>
      <blockly-workspace></blockly-workspace>
      <blockly-sidebar></blockly-sidebar>
    </div>

    <div *ngIf="getAriaLiveReadout()" aria-hidden="true"
         class="blocklyAriaLiveStatus">
      <span aria-live="polite" role="status">{{getAriaLiveReadout()}}</span>
    </div>

    <blockly-block-options-modal></blockly-block-options-modal>
    <blockly-toolbox-modal></blockly-toolbox-modal>

    <label aria-hidden="true" hidden id="blockly-button">
      {{'BUTTON'|translate}}
    </label>
    <label aria-hidden="true" hidden id="blockly-workspace-block">
      {{'WORKSPACE_BLOCK'|translate}}
    </label>
  `,
  directives: [
      blocklyApp.BlockOptionsModalComponent, blocklyApp.SidebarComponent,
      blocklyApp.ToolboxModalComponent, blocklyApp.WorkspaceComponent],
  pipes: [blocklyApp.TranslatePipe],
  // All services are declared here, so that all components in the
  // application use the same instance of the service.
  // https://www.sitepoint.com/angular-2-components-providers-classes-factories-values/
  providers: [
      blocklyApp.AudioService, blocklyApp.BlockOptionsModalService,
      blocklyApp.ClipboardService, blocklyApp.KeyboardInputService,
      blocklyApp.NotificationsService, blocklyApp.ToolboxModalService,
      blocklyApp.TreeService, blocklyApp.UtilsService]
})
.Class({
  constructor: [
    blocklyApp.NotificationsService, function(notificationsService) {
      this.notificationsService = notificationsService;
    }
  ],
  getAriaLiveReadout: function() {
    return this.notificationsService.getAriaLiveReadout();
  }
});
