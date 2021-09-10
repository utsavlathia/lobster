
import { registerLibraryHeader, SourceFile } from "../core/Program";
import { registerOpaqueExpression, OpaqueExpressionImpl, RuntimeOpaqueExpression, getLocal } from "../core/opaqueExpression";
import { Int, CompleteClassType, Bool, VoidType } from "../core/types";
import { getDataPtr } from "./string";
import { Value } from "../core/runtimeEnvironment";


registerLibraryHeader("iostream",
    new SourceFile("iostream.h",
`
class ostream {};

ostream cout;

const char endl = '\\n';

class istream {
private:
    bool _failbit;
    
    istream() {
        @istream::istream_default;
    }
    
public:
    bool good() {
        return @istream::good;
    }

    bool bad() {
        return @istream::bad;
    }

    bool fail() {
        return @istream::fail;
    }

    bool eof() {
        return @istream::eof;
    }

    void clear() {
        @istream::clear
    }

};

istream cin;
`, true)
);



registerOpaqueExpression("istream::istream_default", {
    type: VoidType.VOID,
    valueCategory: "prvalue",
    operate: (rt: RuntimeOpaqueExpression) => {
        rt.contextualReceiver.setAuxiliaryData("stream", rt.sim.cin);
    }
});

registerOpaqueExpression("string::good", <OpaqueExpressionImpl<Bool, "prvalue">>{
    type: Bool.BOOL,
    valueCategory: "prvalue",
    operate: (rt: RuntimeOpaqueExpression<Bool, "prvalue">) => {
        return getSize(rt.contextualReceiver).getValue().equals(Int.ZERO);
    }
});



// registerOpaqueExpression("istream::good", <OpaqueExpressionImpl<Bool, "prvalue">> {
//     type: Bool.BOOL,
//     valueCategory: "prvalue",
//     operate: (rt: RuntimeOpaqueExpression<Bool, "prvalue">) => {
//         return getSize(rt.contextualReceiver);
//     }
// });